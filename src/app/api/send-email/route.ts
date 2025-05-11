import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Create a nodemailer transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, // Your Gmail username
      pass: process.env.EMAIL_PASSWORD, // Your Gmail app password
    },
  });

  // Format the email
  const mailOptions = {
    from: `"${data.firstName} ${data.lastName}" <${process.env.EMAIL_USERNAME}>`,
    to: 'drughidavid6@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <p><strong>Name:</strong> ${data.firstName}</p>
      <p><strong>Efternamn:</strong> ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Org Number:</strong> ${data.orgNumber}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
    replyTo: data.email,
  };  

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ status: 'success' });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ status: 'error', message: 'Failed to send email' }, { status: 500 });
  }
}
