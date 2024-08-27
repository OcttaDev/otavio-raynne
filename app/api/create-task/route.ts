import { NextRequest, NextResponse } from "next/server";

import nodemailer from "nodemailer";

console.log(process.env.NEXT_PUBLIC_GMAIL_USER);
console.log(process.env.NEXT_PUBLIC_GMAIL_PASS);

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER,
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: data.email,
      to: process.env.NEXT_PUBLIC_GMAIL_USER,
      subject: `Novo presente escolhido - ${data.presente}`,
      text: `É com amor que presenteamos a vocês, de coração, ${data.convidado}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json({ status: 401, message: error });
  }
}
