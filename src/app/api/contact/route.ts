import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
   try {
      const formData = await request.json()
      
      // Validate required fields
      if (!formData.email || !formData.message) {
         return NextResponse.json(
         { success: false, message: 'Email and message are required' },
         { status: 400 }
         )
      }

      // Create transporter
      const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_SERVER,
         port: parseInt(process.env.EMAIL_PORT || '587'),
         secure: process.env.EMAIL_SECURE === 'true',
         auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD,
         },
      })

      // Prepare email content
      let subject = 'New Contact Form Submission'
      if (formData.subject === 'custom' && formData.customSubject) {
         subject = formData.customSubject
      } else if (formData.subject) {
         const subjectOption = [
         { value: 'recruiting', label: 'Recruiting & Business' },
         { value: 'invitation', label: 'Invitation' },
         { value: 'feedback', label: 'Feedback or Bug Report' },
         { value: 'question', label: 'General Question' },
         ].find(opt => opt.value === formData.subject)
         
         if (subjectOption) subject = subjectOption.label
      }

      const name = formData.omitName ? 'Anonymous' : formData.fullName || 'Visitor'

      const htmlContent = `
         <h2>New Contact Form Submission</h2>
         <p><strong>From:</strong> ${name} (${formData.email})</p>
         <p><strong>Subject:</strong> ${subject}</p>
         ${formData.projectType ? `<p><strong>Project:</strong> ${formData.projectType}</p>` : ''}
         ${formData.roleType ? `<p><strong>Role:</strong> ${formData.roleType}</p>` : ''}
         <h3>Message:</h3>
         <p>${formData.message.replace(/\n/g, '<br>')}</p>
         <p><em>Sent via portfolio contact form</em></p>
      `

      // Send email
      await transporter.sendMail({
         from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
         to: process.env.EMAIL_RECIPIENT,
         subject: `Contact Form: ${subject}`,
         html: htmlContent,
      })

      return NextResponse.json(
         { success: true, message: 'Message sent successfully!' },
         { status: 200 }
      )
   } catch (error) {
      console.error('Email sending error:', error)
      return NextResponse.json(
         { success: false, message: 'Failed to send message. Please try again.' },
         { status: 500 }
      )
   }
}