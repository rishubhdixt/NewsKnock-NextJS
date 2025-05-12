import User from '@/models/usermodel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userID.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    // ✅ Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // your Gmail address
        pass: process.env.SMTP_PASS, // app password
      },
    });

    const mailOptions = {
      from: `"News Knock" <${process.env.SMTP_USER}>`,
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your account' : 'Reset your password',
      text: 'No reply. Click the link below to continue.',
      html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <h2 style="color:#0070f3;">Welcome to News Knock</h2>
    <p>Hello,</p>
    <p>
      ${
        emailType === 'VERIFY'
          ? 'Thanks for signing up! Please verify your email address by clicking the button below.'
          : 'You requested a password reset. Click the button below to proceed.'
      }
    </p>
    <p style="margin: 20px 0;">
      <a href="https://${process.env.DOMAIN}/verifyemail?token=${hashToken}" 
         style="background-color:#0070f3;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
        ${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}
      </a>
    </p>
    <p>If the button doesn't work, use this link:</p>
    <p style="font-size: 14px; word-break: break-word;">
      https://${process.env.DOMAIN}/verifyemail?token=${hashToken}
    </p>
    <hr style="margin-top:30px;"/>
    <p style="font-size: 12px; color: gray;">
      If you did not request this, please ignore this email.
    </p>
    <p style="font-size: 12px; color: gray;">
      Sent by News Knock | ${process.env.DOMAIN}
    </p>
  </div>
`

    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send email');
  }
};