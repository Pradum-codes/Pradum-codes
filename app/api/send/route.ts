import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send mail
        // 1. Email to you
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New message from ${name}`,
            html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
        });

        // 2. Confirmation email to them
        await transporter.sendMail({
            from: `"Pradum Portfolio" <${process.env.EMAIL_USER}>`,
            to: email, // sender’s email
            subject: "Thanks for reaching out!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>👋 Hi ${name},</h2>
                <p>Thanks for contacting me through my portfolio! I’ll get back to you as soon as possible.</p>
                <hr />
                <p style="font-size: 12px; color: #888;">This is an automated message.</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
