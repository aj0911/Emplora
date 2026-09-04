import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || 'jhaabhinav16@gmail.com';
const LOG_FILE_PATH = path.join(process.cwd(), 'email_notifications.log');
const LEADS_FILE_PATH = path.join(process.cwd(), 'waitlist_leads.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, companyName = 'N/A', companySize = 'N/A', role = 'Lead' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const newLead = {
      timestamp,
      email,
      companyName,
      companySize,
      role,
      targetRecipient: RECIPIENT_EMAIL,
    };

    // 1. Save lead to waitlist_leads.json
    let existingLeads: any[] = [];
    if (fs.existsSync(LEADS_FILE_PATH)) {
      try {
        existingLeads = JSON.parse(fs.readFileSync(LEADS_FILE_PATH, 'utf-8'));
      } catch (e) {
        existingLeads = [];
      }
    }
    existingLeads.push(newLead);
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(existingLeads, null, 2), 'utf-8');

    // 2. Prepare email payload
    const mailSubject = `🚀 New Emplora Early Access Lead: ${email}`;
    const mailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #171b23; background-color: #f8f9fb; border-radius: 8px;">
        <h2 style="color: #4360ea; margin-bottom: 8px;">New Emplora Early Access Request</h2>
        <p style="color: #5b6474; font-size: 14px;">A new visitor has submitted their email on the Emplora Coming Soon website.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e5e8ee; width: 140px;">Work Email:</td><td style="padding: 10px; border-bottom: 1px solid #e5e8ee; color: #4360ea; font-weight: bold;">${email}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e5e8ee;">Company:</td><td style="padding: 10px; border-bottom: 1px solid #e5e8ee;">${companyName}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e5e8ee;">Headcount:</td><td style="padding: 10px; border-bottom: 1px solid #e5e8ee;">${companySize}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e5e8ee;">Role:</td><td style="padding: 10px; border-bottom: 1px solid #e5e8ee;">${role}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e5e8ee;">Timestamp:</td><td style="padding: 10px; border-bottom: 1px solid #e5e8ee;">${timestamp}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 12px; color: #7b8496;">Dispatched to ${RECIPIENT_EMAIL} via Emplora Nodemailer Engine.</p>
      </div>
    `;

    // 3. Gmail Nodemailer Transport Dispatch
    const smtpUser = process.env.SMTP_USER || 'jhaabhinav16@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'hdjpxiknjgkdimbm';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Emplora Waitlist" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      subject: mailSubject,
      html: mailHtml,
    });

    const successLog = `[${timestamp}] GMAIL SENT SUCCESSFULLY TO ${RECIPIENT_EMAIL}. Message ID: ${info.messageId}\n`;
    fs.appendFileSync(LOG_FILE_PATH, successLog, 'utf-8');

    return NextResponse.json({
      success: true,
      emailSent: true,
      recipient: RECIPIENT_EMAIL,
      position: 100 + existingLeads.length,
    });
  } catch (error: any) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to send email notification' }, { status: 500 });
  }
}
