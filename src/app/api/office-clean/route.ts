import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Create a nodemailer transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Format the email for admin
  const mailOptions = {
    from: `"${data.firstName} ${data.lastName}" <${process.env.EMAIL_USERNAME}>`,
    to: 'drughidavid6@gmail.com',
    subject: 'Ny förfrågan om kontorsstädning',
    html: `
      <div style="max-width:520px;margin:0 auto;background:#f9f9f9;border-radius:10px;padding:32px 24px;font-family:sans-serif;color:#222;">
        <div style="text-align:center;">
          <img src="https://alma-grupp.se/logo.png" alt="Alma Grupp" style="width:80px;margin-bottom:16px;" />
          <h2 style="color:#1a202c;margin-bottom:8px;">Ny förfrågan om kontorsstädning</h2>
          <p style="font-size:18px;margin-bottom:24px;">Du har fått en ny förfrågan via hemsidan.</p>
        </div>
        <div style="background:#fff;border-radius:8px;padding:20px 16px;margin-bottom:24px;">
          <table style="width:100%;font-size:16px;color:#222;">
            <tr>
              <td style="padding:6px 0;width:130px;"><strong>Namn:</strong></td>
              <td style="padding:6px 0;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>E-post:</strong></td>
              <td style="padding:6px 0;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Telefon:</strong></td>
              <td style="padding:6px 0;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Org-nummer:</strong></td>
              <td style="padding:6px 0;">${data.orgNumber}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;vertical-align:top;"><strong>Meddelande:</strong></td>
              <td style="padding:6px 0;white-space:pre-line;">${data.message}</td>
            </tr>
          </table>
        </div>
        <p style="font-size:15px;color:#666;">Detta är en notis från hemsidans kontaktformulär.<br><strong>Alma Grupp</strong></p>
        <hr style="margin:32px 0 16px 0;border:none;border-top:1px solid #eee;">
        <p style="font-size:13px;color:#aaa;text-align:center;">Skickad automatiskt från alma-grupp.se</p>
      </div>
    `,
    replyTo: data.email,
  };

  try {
    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"Alma Grupp" <${process.env.EMAIL_USERNAME}>`,
      to: data.email,
      subject: 'Tack för din förfrågan!',
      html: `
        <div style="max-width:520px;margin:0 auto;background:#f9f9f9;border-radius:10px;padding:32px 24px;font-family:sans-serif;color:#222;">
          <div style="text-align:center;">
            <img src="https://alma-grupp.se/logo.png" alt="Alma Grupp" style="width:80px;margin-bottom:16px;" />
            <h2 style="color:#1a202c;margin-bottom:8px;">Tack för din förfrågan, ${data.firstName}!</h2>
            <p style="font-size:18px;margin-bottom:24px;">Vi har tagit emot din förfrågan och återkommer till dig så snart som möjligt.</p>
          </div>
          <div style="background:#fff;border-radius:8px;padding:20px 16px;margin-bottom:24px;">
            <p style="margin:0 0 8px 0;"><strong>Dina uppgifter:</strong></p>
            <ul style="margin:0;color:#444;padding-left:18px;">
              <li><strong>Namn:</strong> ${data.firstName} ${data.lastName}</li>
              <li><strong>Telefon:</strong> ${data.phone}</li>
              <li><strong>Org-nummer:</strong> ${data.orgNumber}</li>
              <li><strong>E-post:</strong> ${data.email}</li>
              <li><strong>Meddelande:</strong> ${data.message}</li>
            </ul>
          </div>
          <p style="font-size:15px;color:#666;">Vänliga hälsningar,<br><strong>Alma Grupp</strong></p>
          <hr style="margin:32px 0 16px 0;border:none;border-top:1px solid #eee;">
          <p style="font-size:13px;color:#aaa;text-align:center;">Detta är en automatisk bekräftelse på att vi mottagit din förfrågan.</p>
        </div>
      `,
    });

    return NextResponse.json({ status: 'success' });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ status: 'error', message: 'Failed to send email' }, { status: 500 });
  }
}
