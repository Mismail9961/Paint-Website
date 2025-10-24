import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, orderNumber, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Configure transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,        // your Gmail
        pass: process.env.ADMIN_EMAIL_PASS,   // your App Password
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_EMAIL, // your receiving address
      subject: `📩 New Contact Form Submission: ${subject}`,
      text: `
You have a new message from your website contact form:

👤 Name: ${name}
📧 Email: ${email}
#️⃣ Order Number: ${orderNumber || "N/A"}
📝 Subject: ${subject}
💬 Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    return NextResponse.json(
      { message: "Failed to send message." },
      { status: 500 }
    );
  }
}
