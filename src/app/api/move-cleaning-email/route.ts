import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

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
    subject: 'Ny bokning av flyttstädning',
    html: `
      <div style="max-width:520px;margin:0 auto;background:#f9f9f9;border-radius:10px;padding:32px 24px;font-family:sans-serif;color:#222;">
        <div style="text-align:center;">
          <img src="https://alma-grupp.se/logo.png" alt="Alma Grupp" style="width:80px;margin-bottom:16px;" />
          <h2 style="color:#1a202c;margin-bottom:8px;">Ny bokning av flyttstädning</h2>
          <p style="font-size:18px;margin-bottom:24px;">Du har fått en ny bokning via hemsidan.</p>
        </div>
        <div style="background:#fff;border-radius:8px;padding:20px 16px;margin-bottom:24px;">
          <table style="width:100%;font-size:16px;color:#222;">
            <tr>
              <td style="padding:6px 0;width:130px;"><strong>Namn:</strong></td>
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
              <td style="padding:6px 0;"><strong>Adress:</strong></td>
              <td style="padding:6px 0;">${data.address}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Postnummer:</strong></td>
              <td style="padding:6px 0;">${data.postalCode}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Stad:</strong></td>
              <td style="padding:6px 0;">${data.city}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Storlek:</strong></td>
              <td style="padding:6px 0;">${data.kvm} kvm</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Husdjur:</strong></td>
              <td style="padding:6px 0;">${data.hasPets}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Tillgång:</strong></td>
              <td style="padding:6px 0;">${data.accessOption}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Datum:</strong></td>
              <td style="padding:6px 0;">${data.date}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;"><strong>Pris:</strong></td>
              <td style="padding:6px 0;">${data.totalPrice}</td>
            </tr>
          </table>
          ${
            data.extraInfo
              ? `<div style="margin-top:18px;">
                  <p style="margin:0 0 8px 0;"><strong>Önskemål / detaljer:</strong></p>
                  <p style="margin:0;color:#444;">${data.extraInfo}</p>
                </div>`
              : ''
          }
        </div>
        <p style="font-size:15px;color:#666;">Detta är en notis från hemsidans bokningsformulär.<br><strong>Alma Grupp</strong></p>
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
      subject: 'Tack för din bokning!',
      html: `
        <div style="max-width:520px;margin:0 auto;background:#f9f9f9;border-radius:10px;padding:32px 24px;font-family:sans-serif;color:#222;">
          <div style="text-align:center;">
            <img src="https://alma-grupp.se/logo.png" alt="Alma Grupp" style="width:80px;margin-bottom:16px;" />
            <h2 style="color:#1a202c;margin-bottom:8px;">Tack för din bokning, ${data.name}!</h2>
            <p style="font-size:18px;margin-bottom:24px;">Vi har tagit emot din bokning och återkommer till dig så snart som möjligt.</p>
          </div>
          <div style="background:#fff;border-radius:8px;padding:20px 16px;margin-bottom:24px;">
            <p style="margin:0 0 8px 0;"><strong>Dina uppgifter:</strong></p>
            <ul style="margin:0;color:#444;padding-left:18px;">
              <li><strong>Telefon:</strong> ${data.phone}</li>
              <li><strong>Adress:</strong> ${data.address}</li>
              <li><strong>Postnummer:</strong> ${data.postalCode}</li>
              <li><strong>Stad:</strong> ${data.city}</li>
              <li><strong>Storlek:</strong> ${data.kvm} kvm</li>
              <li><strong>Husdjur:</strong> ${data.hasPets}</li>
              <li><strong>Tillgång:</strong> ${data.accessOption}</li>
              <li><strong>Datum:</strong> ${data.date}</li>
              <li><strong>Pris:</strong> ${data.totalPrice}</li>
            </ul>
            ${
              data.extraInfo
                ? `<div style="margin-top:18px;">
                    <p style="margin:0 0 8px 0;"><strong>Önskemål / detaljer:</strong></p>
                    <p style="margin:0;color:#444;">${data.extraInfo}</p>
                  </div>`
                : ''
            }
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
