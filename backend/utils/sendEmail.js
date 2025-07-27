import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

export const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Job Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      attachments, // array of attachment objects (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};