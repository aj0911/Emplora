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
    const { name = 'N/A', email, companyName = 'N/A', companySize = 'N/A', role = 'Lead', onSpreadsheets = false } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const newLead = {
      timestamp,
      name,
      email,
      companyName,
      companySize,
      role,
      onSpreadsheets,
      targetRecipient: RECIPIENT_EMAIL,
    };

    // 1. Prepare email payload
    const mailSubject = `New Emplora waitlist signup: ${email}`;
    const mailHtml = `
      <div style="font-family: -apple-system, 'Geist', Arial, sans-serif; padding: 28px; color: #e9ecf2; background-color: #0e1117; border-radius: 12px;">
        <h2 style="color: #6b84f7; margin: 0 0 8px;">New Emplora waitlist signup</h2>
        <p style="color: #a2abbd; font-size: 14px;">A new visitor joined the waitlist on the Emplora coming-soon page.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr><td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #252c38; width: 140px;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #252c38;">${name}</td></tr>
          <tr><td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #252c38;">Work Email:</td><td style="padding: 10px; border-bottom: 1px solid #252c38; color: #9aadff; font-weight: 600;">${email}</td></tr>
          <tr><td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #252c38;">Company:</td><td style="padding: 10px; border-bottom: 1px solid #252c38;">${companyName}</td></tr>
          <tr><td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #252c38;">Employees:</td><td style="padding: 10px; border-bottom: 1px solid #252c38;">${companySize}</td></tr>
          <tr><td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #252c38;">Role:</td><td style="padding: 10px; border-bottom: 1px solid #252c38;">${role}</td></tr>
          <tr><td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #252c38;">On spreadsheets today:</td><td style="padding: 10px; border-bottom: 1px solid #252c38;">${onSpreadsheets ? 'Yes' : 'No'}</td></tr>
          <tr><td style="padding: 10px; font-weight: 600;">Timestamp:</td><td style="padding: 10px;">${timestamp}</td></tr>
        </table>
        <p style="margin-top: 24px; font-size: 12px; color: #7b8496;">Dispatched to ${RECIPIENT_EMAIL} via Emplora Nodemailer Engine.</p>
      </div>
    `;

    // 2. Gmail Nodemailer Transport Dispatch
    const smtpUser = process.env.SMTP_USER || 'jhaabhinav16@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'hdjpxiknjgkdimbm';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Emplora Waitlist" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      subject: mailSubject,
      html: mailHtml,
    });

    const mockPosition = Math.floor(Math.random() * 50) + 140;

    return NextResponse.json({
      success: true,
      emailSent: true,
      recipient: RECIPIENT_EMAIL,
      position: mockPosition,
    });
  } catch (error: unknown) {
    console.error('Waitlist API Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send email notification';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
