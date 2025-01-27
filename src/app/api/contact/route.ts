import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  secure: true,
  tls: {
    rejectUnauthorized: false
  }
})

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email content
    const mailOptions = {
      from: `"AI Healthcare" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🌟 New Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #3b82f6; margin-bottom: 24px; text-align: center;">New Contact Form Message</h1>
          
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <h2 style="color: #1f2937; margin-bottom: 8px;">Sender Information</h2>
            <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px;">
            <h2 style="color: #1f2937; margin-bottom: 8px;">Message Details</h2>
            <p style="margin: 4px 0;"><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 12px; white-space: pre-line;">
              ${message}
            </div>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px; text-align: center;">
            Sent from AI Healthcare Contact Form
          </p>
        </div>
      `
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Message sent: %s', info.messageId)
      return NextResponse.json({ success: true, messageId: info.messageId })
    } catch (emailError: any) {
      console.error('Email sending error:', {
        error: emailError,
        errorCode: emailError.code,
        errorMessage: emailError.message,
        errorResponse: emailError.response
      })
      return NextResponse.json(
        { error: 'Failed to send email', details: emailError.message },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 