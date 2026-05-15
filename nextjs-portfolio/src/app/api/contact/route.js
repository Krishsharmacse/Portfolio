import nodemailer from 'nodemailer';

// Gmail transporter using the app-password from .env.local
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    await transporter.sendMail({
      from:     `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:       process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo:  email,
      subject:  `📩 New Contact: ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0d0d0d;color:#e5e5e5;border-radius:12px;">
          <h2 style="color:#a78bfa;margin-top:0;">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;width:100px;">Name</td>
                <td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td>
                <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#a78bfa;">${email}</a></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #333;margin:20px 0;" />
          <p style="color:#888;margin:0 0 8px;">Message</p>
          <p style="white-space:pre-wrap;line-height:1.7;margin:0;">${message}</p>
          <hr style="border:none;border-top:1px solid #333;margin:20px 0;" />
          <p style="font-size:12px;color:#555;">Sent via your portfolio contact form</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
