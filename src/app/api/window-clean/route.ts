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

  // Format the email for admin
  const mailOptions = {
    from: `"${data.name}" <${process.env.EMAIL_USERNAME}>`,
    to: 'drughidavid6@gmail.com',
    subject: 'Ny fönsterputsning - Alma Grupp',
    html: `
      <div style="max-width:520px;margin:0 auto;background:#f9f9f9;border-radius:10px;padding:32px 24px;font-family:sans-serif;color:#222;">
        <div style="text-align:center;">
          <img src="https://alma-grupp.se/logo.png" alt="Alma Grupp" style="width:80px;margin-bottom:16px;" />
          <h2 style="color:#1a202c;margin-bottom:8px;">Ny Fönsterputsning</h2>
          <p style="font-size:18px;margin-bottom:24px;">Du har fått en ny bokning från hemsidan.</p>
        </div>
        <div style="background:#fff;border-radius:8px;padding:20px 16px;margin-bottom:24px;">
          <table style="width:100%;font-size:16px;color:#222;">
            <tr>
              <td style="padding:6px 0;width:150px;"><strong>Namn:</strong></td>
              <td style="padding:6px 0;">${data.name}</td>
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
              <td style="padding:6px 0;"><strong>Typ av fönster:</strong></td>
              <td style="padding:6px 0;">${data.type}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Antal fönster:</strong></td>
              <td style="padding:6px 0;">${data.amount}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Fönsterbleck:</strong></td>
              <td style="padding:6px 0;">${data.bleck ?? 0}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Karmtvätt:</strong></td>
              <td style="padding:6px 0;">${data.karm ?? 0}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Behöver stege:</strong></td>
              <td style="padding:6px 0;">${data.stege ? 'Ja' : 'Nej'}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Totalt pris:</strong></td>
              <td style="padding:6px 0;">${data.total} kr</td>
            </tr>
          </table>
        </div>
        <p style="font-size:15px;color:#666;">Detta är en notis från hemsidans fönsterputsformulär.<br><strong>Alma Grupp</strong></p>
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
      subject: 'Tack för din bokning av fönsterputsning!',
      html: `
        <div style="max-width:520px;margin:0 auto;background:#f9f9f9;border-radius:10px;padding:32px 24px;font-family:sans-serif;color:#222;">
          <div style="text-align:center;">
            <img src="https://alma-grupp.se/logo.png" alt="Alma Grupp" style="width:80px;margin-bottom:16px;" />
            <h2 style="color:#1a202c;margin-bottom:8px;">Tack för din bokning, ${data.name}!</h2>
            <p style="font-size:18px;margin-bottom:24px;">Vi har tagit emot din bokning och återkommer till dig så snart som möjligt.</p>
          </div>
          <div style="background:#fff;border-radius:8px;padding:20px 16px;margin-bottom:24px;">
            <table style="width:100%;font-size:16px;color:#222;">
              <tr>
                <td style="padding:6px 0;width:150px;"><strong>Typ av fönster:</strong></td>
                <td style="padding:6px 0;">${data.type}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Antal fönster:</strong></td>
                <td style="padding:6px 0;">${data.amount}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Fönsterbleck:</strong></td>
                <td style="padding:6px 0;">${data.bleck ?? 0}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Karmtvätt:</strong></td>
                <td style="padding:6px 0;">${data.karm ?? 0}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Behöver stege:</strong></td>
                <td style="padding:6px 0;">${data.stege ? 'Ja' : 'Nej'}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;"><strong>Totalt pris:</strong></td>
                <td style="padding:6px 0;">${data.total} kr</td>
              </tr>
            </table>
          </div>
          <p style="font-size:15px;color:#666;">Vänliga hälsningar,<br><strong>Alma Grupp</strong></p>
          <hr style="margin:32px 0 16px 0;border:none;border-top:1px solid #eee;">
          <p style="font-size:13px;color:#aaa;text-align:center;">Detta är en automatisk bekräftelse på att vi mottagit din bokning.</p>
        </div>
      `,
    });

    return NextResponse.json({ status: 'success' });
  } catch (err) {
    console.error('Error sending email:', err);
    return NextResponse.json({ status: 'error', message: 'Failed to send email' }, { status: 500 });
  }
}