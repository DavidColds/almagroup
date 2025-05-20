import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Städformulär" <${process.env.EMAIL_USERNAME}>`,
    to: 'drughidavid6@gmail.com',
    subject: 'Ny Offertförfrågan – Fast Pris Städning',
    html: `
      <p>📏 <strong>Bostadens storlek:</strong> ${data.kvm} kvm</p>
      <p>🔥 <strong>Ugnsrengöring:</strong> ${data.includeOven ? 'Ja' : 'Nej'}</p>
      <p>❄️ <strong>Kyl/Frys rengöring:</strong> ${data.includeFridge ? 'Ja' : 'Nej'}</p>
      <p>💰 <strong>Totalt pris:</strong> ${data.price}</p>
      <hr />
      <p>👤 <strong>Namn:</strong> ${data.name}</p>
      <p>📧 <strong>Email:</strong> ${data.email}</p>
      <p>📞 <strong>Telefonnummer:</strong> ${data.phone}</p>
      <p>📅 <strong>Datum:</strong> ${data.date}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ status: 'success' });
  } catch (err) {
    console.error('Error sending fixed-cleaning email:', err);
    return NextResponse.json({ status: 'error', message: 'Failed to send email' }, { status: 500 });
  }
}
