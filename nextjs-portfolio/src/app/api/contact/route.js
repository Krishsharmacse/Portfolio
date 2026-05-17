import { NextResponse } from 'next/server';

// ─── In-memory rate limiter — keyed by IP + device fingerprint ───────────────
const RATE_MAP    = new Map();         // key → { count, resetAt }
const RATE_LIMIT  = 5;                 // max requests per window per key
const RATE_WINDOW = 15 * 60 * 1000;   // 15 minutes in ms

/**
 * Lightweight, non-cryptographic hash (FNV-1a 32-bit).
 * Good enough to distinguish browser fingerprints without the overhead of
 * Node's `crypto` module on every request.
 */
function fnv1a(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0; // keep 32-bit unsigned
  }
  return hash.toString(16);
}

/**
 * Build a composite rate-limit key from:
 *   1. Client IP address
 *   2. A "device fingerprint" — FNV-1a hash of User-Agent + Accept headers
 *
 * Benefits:
 *  - Multiple devices behind the same NAT/IP don't share a quota.
 *  - A single device that rotates IPs (VPN, mobile network) is still limited.
 *  - We enforce limits on BOTH dimensions independently (see below).
 */
function getRateLimitKeys(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip        = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  const ua        = req.headers.get('user-agent')    || '';
  const accept    = req.headers.get('accept')        || '';
  const lang      = req.headers.get('accept-language') || '';
  const fingerprint = fnv1a(`${ua}|${accept}|${lang}`);

  return {
    ipKey:          ip,                          // limit per IP
    deviceKey:      `fp::${fingerprint}`,        // limit per device (across IPs)
    compositeKey:   `${ip}::${fingerprint}`,     // limit per IP+device pair
  };
}

function checkRateLimit(key) {
  const now   = Date.now();
  const entry = RATE_MAP.get(key);
  if (!entry || now > entry.resetAt) {
    RATE_MAP.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;                      // allowed
  }
  if (entry.count >= RATE_LIMIT) return false; // blocked
  entry.count++;
  return true;
}

/**
 * Enforce rate limits on all three dimensions.
 * A request is allowed only if ALL three checks pass.
 */
function isRateLimited(req) {
  const { ipKey, deviceKey, compositeKey } = getRateLimitKeys(req);
  // Check all keys — side-effectfully increments whichever ones are still under limit
  const ipOk        = checkRateLimit(ipKey);
  const deviceOk    = checkRateLimit(deviceKey);
  const compositeOk = checkRateLimit(compositeKey);
  return !(ipOk && deviceOk && compositeOk);
}

// ─── Input sanitisation — strip HTML/script tags ─────────────────────────────
function sanitize(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// ─── Validators ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function validate({ name, email, message, honeypot }) {
  // Honeypot — bots fill hidden fields, humans don't
  if (honeypot) return 'Bot detected';

  if (!name    || name.trim().length    < 2)   return 'Name must be at least 2 characters';
  if (!email   || !EMAIL_RE.test(email.trim())) return 'Valid email address required';
  if (!message || message.trim().length < 10)   return 'Message must be at least 10 characters';
  if (name.length    > 100) return 'Name too long';
  if (email.length   > 254) return 'Email too long';
  if (message.length > 3000) return 'Message too long (max 3000 characters)';
  return null; // OK
}

// ─── HTML email template (safe — all user inputs are sanitised) ───────────────
function buildHtml(name, email, message) {
  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safeMessage = sanitize(message).replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#090912;font-family:sans-serif;">
  <div style="max-width:560px;margin:40px auto;padding:32px;
              background:#0f0f1a;color:#e5e5e5;border-radius:12px;
              border:1px solid #1e1e2e;">
    <h2 style="color:#a78bfa;margin:0 0 24px;font-size:20px;">
      📩 New Portfolio Message
    </h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr>
        <td style="padding:8px 0;color:#666;width:80px;font-size:13px;">Name</td>
        <td style="padding:8px 0;font-weight:600;font-size:14px;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#666;font-size:13px;">Email</td>
        <td style="padding:8px 0;font-size:14px;">
          <a href="mailto:${safeEmail}" style="color:#a78bfa;text-decoration:none;">
            ${safeEmail}
          </a>
        </td>
      </tr>
    </table>
    <hr style="border:none;border-top:1px solid #1e1e2e;margin:0 0 20px;">
    <p style="color:#666;margin:0 0 10px;font-size:12px;text-transform:uppercase;
              letter-spacing:0.5px;">Message</p>
    <p style="white-space:pre-wrap;line-height:1.75;margin:0;font-size:14px;">
      ${safeMessage}
    </p>
    <hr style="border:none;border-top:1px solid #1e1e2e;margin:20px 0 0;">
    <p style="font-size:11px;color:#444;margin:12px 0 0;">
      Sent via portfolio contact form · IP redacted for privacy
    </p>
  </div>
</body>
</html>`;
}

// ─── Send via Resend ──────────────────────────────────────────────────────────
async function sendWithResend(name, email, message) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from:    'Portfolio Contact <onboarding@resend.dev>',
    to:      [process.env.EMAIL_TO || 'krishsharma1062@gmail.com'],
    replyTo: email,
    subject: `New Contact from ${name}`,
    html:    buildHtml(name, email, message),
  });
  if (error) throw new Error(error.message);
}

// ─── Send via Nodemailer / Gmail (local dev fallback) ────────────────────────
async function sendWithNodemailer(name, email, message) {
  const nodemailer = (await import('nodemailer')).default;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  await transporter.sendMail({
    from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Contact from ${name}`,
    html:    buildHtml(name, email, message),
  });
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    // ── Security headers ──
    const headers = {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options':        'DENY',
    };

    // ── Rate limit by IP + device fingerprint ──
    if (isRateLimited(req)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait 15 minutes.' },
        { status: 429, headers }
      );
    }

    // ── Parse body safely ──
    let body;
    try { body = await req.json(); }
    catch { return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400, headers }); }

    const { name, email, message, honeypot } = body;

    // ── Validate inputs ──
    const validationError = validate({ name, email, message, honeypot });
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400, headers });
    }

    // ── Trim safely ──
    const cleanName    = name.trim();
    const cleanEmail   = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    // ── Send ──
    if (process.env.RESEND_API_KEY) {
      await sendWithResend(cleanName, cleanEmail, cleanMessage);
    } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendWithNodemailer(cleanName, cleanEmail, cleanMessage);
    } else {
      throw new Error('No email transport configured');
    }

    return NextResponse.json({ success: true }, { headers });

  } catch (err) {
    // ── Never leak internal error details to client ──
    console.error('[contact]', err.message);
    return NextResponse.json(
      { success: false, error: 'Could not send message. Please try the direct email link.' },
      { status: 500 }
    );
  }
}

// Block all other HTTP methods
export async function GET()    { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
export async function PUT()    { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
