import nodemailer from 'nodemailer';

// ─── HTML email template ────────────────────────────────────────────────────
function buildHtml(name, email, message) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;
                background:#0d0d0d;color:#e5e5e5;border-radius:12px;">
      <h2 style="color:#a78bfa;margin-top:0;">📩 New Portfolio Message</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#888;width:80px;">Name</td>
          <td style="padding:8px 0;font-weight:600;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#888;">Email</td>
          <td style="padding:8px 0;">
            <a href="mailto:${email}" style="color:#a78bfa;">${email}</a>
          </td>
        </tr>
      </table>
      <hr style="border:none;border-top:1px solid #333;margin:20px 0;" />
      <p style="color:#888;margin:0 0 8px;">Message</p>
      <p style="white-space:pre-wrap;line-height:1.7;margin:0;">${message}</p>
      <hr style="border:none;border-top:1px solid #333;margin:20px 0;" />
      <p style="font-size:12px;color:#555;">Sent via your portfolio contact form</p>
    </div>
  `;
}

// ─── Send via Resend (production / Vercel) ───────────────────────────────────
async function sendWithResend(name, email, message) {
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from:    'Portfolio Contact <onboarding@resend.dev>',
    to:      [process.env.EMAIL_TO || 'krishsharma1062@gmail.com'],
    replyTo: email,
    subject: `📩 New Contact: ${name}`,
    html:    buildHtml(name, email, message),
  });

  if (error) throw new Error(error.message);
}

// ─── Send via Nodemailer / Gmail (local dev fallback) ────────────────────────
async function sendWithNodemailer(name, email, message) {
  const nodemailer = (await import('nodemailer')).default;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `📩 New Contact: ${name}`,
    html:    buildHtml(name, email, message),
  });
}

// ─── Route handler ───────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // Use Resend on Vercel (if key present), otherwise fall back to Gmail
    if (process.env.RESEND_API_KEY) {
      await sendWithResend(name, email, message);
    } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendWithNodemailer(name, email, message);
    } else {
      throw new Error('No email credentials configured');
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err.message);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
