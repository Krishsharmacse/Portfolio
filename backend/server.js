import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

console.log("🛠 Checking System Environment...");

dotenv.config();

const app = express();


if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ ERROR: EMAIL_USER or EMAIL_PASS is missing from environment variables!");
} else {
  console.log("✅ Environment variables loaded for:", process.env.EMAIL_USER);
}

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
  origin: [FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
  methods: ["POST", "GET", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Nodemailer Transporter Error:", error.message);
  } else {
    console.log("🚀 Mail server is ready to send messages");
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 Received a request from:", email);

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `📩 Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #3b82f6;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", process.env.EMAIL_USER);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Send mail error detail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Backend Server running on port ${PORT}`);
});