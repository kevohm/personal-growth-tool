import nodemailer from "nodemailer"
import { transporter } from "../config";


export async function sendResetEmail(to: string, resetUrl: string) {
  const info = await transporter.sendMail({
    from: `"MoneyPlus Support" <${process.env.SMTP_USER}>`,
    to,
    subject: "Reset your MoneyPlus password",
    text: `We received a request to reset your MoneyPlus account password. 
    Please use the link below to reset it. 
    This link will expire in 60 minutes.
    Reset your password: ${resetUrl}
    If you did not request this change, you can safely ignore this email.`,
    html: `
      <p>Hello,</p>
      <p>We received a request to reset your <strong>MoneyPlus</strong> account password.</p>
      <p>Please click the link below to reset your password. This link will expire in <strong>60 minutes</strong>:</p>
      <p><a href="${resetUrl}" style="color:#2563eb; text-decoration:none;">Reset your password</a></p>
      <br/>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <p>– The MoneyPlus Team</p>
    `,
  });

  console.log("Reset email sent:", info.messageId);
  return info;
}

