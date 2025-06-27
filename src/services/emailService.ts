
import { supabase } from "@/integrations/supabase/client";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async ({ to, subject, html, text }: EmailParams): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-notification-email', {
      body: { to, subject, html, text }
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in email service:', error);
    return false;
  }
};

// Email template for new message notifications
export const createNewMessageEmailTemplate = (senderName: string, message: string, conversationUrl: string) => {
  return {
    subject: `New message from ${senderName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6d28d9;">New Message Notification</h2>
        <p>You have received a new message from <strong>${senderName}</strong>:</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;">${message}</p>
        </div>
        <a href="${conversationUrl}" style="background-color: #6d28d9; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">View Message</a>
        <p style="color: #6b7280; margin-top: 30px; font-size: 0.9em;">If you don't want to receive these emails, you can update your notification preferences in your account settings.</p>
      </div>
    `,
    text: `New message from ${senderName}: ${message}. View at: ${conversationUrl}`
  };
};

// Email template for order status updates
export const createOrderUpdateEmailTemplate = (orderNumber: string, status: string, details: string, orderUrl: string) => {
  return {
    subject: `Order #${orderNumber} ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6d28d9;">Order Status Update</h2>
        <p>Your order <strong>#${orderNumber}</strong> has been <strong>${status}</strong>.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;">${details}</p>
        </div>
        <a href="${orderUrl}" style="background-color: #6d28d9; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">View Order Details</a>
        <p style="color: #6b7280; margin-top: 30px; font-size: 0.9em;">If you don't want to receive these emails, you can update your notification preferences in your account settings.</p>
      </div>
    `,
    text: `Order #${orderNumber} has been ${status}. ${details}. View details at: ${orderUrl}`
  };
};

// Email template for announcements
export const createAnnouncementEmailTemplate = (title: string, content: string, linkUrl?: string) => {
  return {
    subject: title,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6d28d9;">${title}</h2>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
          ${content}
        </div>
        ${linkUrl ? `<a href="${linkUrl}" style="background-color: #6d28d9; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">Learn More</a>` : ''}
        <p style="color: #6b7280; margin-top: 30px; font-size: 0.9em;">If you don't want to receive these emails, you can update your notification preferences in your account settings.</p>
      </div>
    `,
    text: `${title}: ${content.replace(/<[^>]*>/g, '')}. ${linkUrl ? `Learn more at: ${linkUrl}` : ''}`
  };
};

// Welcome email helper
export const sendWelcomeEmail = async (to: string, name: string, loginUrl: string): Promise<boolean> => {
  const currentYear = new Date().getFullYear();
  const companyName = "RODA"; // Updated company name
  
  const emailContent = {
    to,
    subject: "Welcome to RODA!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to RODA</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #4F46E5;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px 20px;
      background-color: #f9fafb;
    }
    .footer {
      background-color: #f3f4f6;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
    .btn {
      display: inline-block;
      background-color: #4F46E5;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .highlight {
      background-color: #EEF2FF;
      padding: 15px;
      border-radius: 4px;
      border-left: 4px solid #4F46E5;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to ${companyName}!</h1>
  </div>
  <div class="content">
    <p>Hello ${name},</p>
    
    <p>Thank you for joining our platform. We're excited to have you with us!</p>
    
    <p>Here are a few things you can do to get started:</p>
    <ul>
      <li>Complete your profile information</li>
      <li>Browse services that match your interests</li>
      <li>Connect with partners in our network</li>
    </ul>
    
    <div class="highlight">
      <p>We're committed to helping you succeed on our platform. If you have any questions, our support team is ready to help.</p>
    </div>
    
    <a href="${loginUrl}" class="btn">Log In To Your Account</a>
    
    <p>If you have any questions, please don't hesitate to reach out to us at <a href="mailto:support@roda.pk">support@roda.pk</a>.</p>
    
    <p>Best regards,<br>The Team at ${companyName}</p>
  </div>
  <div class="footer">
    <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
    <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe</a>.</p>
  </div>
</body>
</html>`,
    text: `Welcome to ${companyName}!

Hello ${name},

Thank you for joining our platform. We're excited to have you with us!

Here are a few things you can do to get started:
- Complete your profile information
- Browse services that match your interests
- Connect with partners in our network

We're committed to helping you succeed on our platform. If you have any questions, our support team is ready to help.

Log in to your account: ${loginUrl}

If you have any questions, please don't hesitate to reach out to us at support@roda.pk.

Best regards,
The Team at ${companyName}

© ${currentYear} ${companyName}. All rights reserved.`
  };
  
  return sendEmail(emailContent);
};

// Password reset email helper
export const sendPasswordResetEmail = async (to: string, name: string, resetLink: string, expiryTime: string): Promise<boolean> => {
  const currentYear = new Date().getFullYear();
  const companyName = "RODA"; // Updated company name
  
  const emailContent = {
    to,
    subject: "Reset Your Password",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #4F46E5;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px 20px;
      background-color: #f9fafb;
    }
    .footer {
      background-color: #f3f4f6;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
    }
    .btn {
      display: inline-block;
      background-color: #4F46E5;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .alert {
      background-color: #FEF2F2;
      border-left: 4px solid #B91C1C;
      padding: 15px;
      margin: 20px 0;
    }
    .warning {
      color: #B91C1C;
      font-size: 14px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Reset Your Password</h1>
  </div>
  <div class="content">
    <p>Hello ${name},</p>
    
    <p>We received a request to reset the password for your account. If you made this request, please click the button below to reset your password:</p>
    
    <a href="${resetLink}" class="btn">Reset Password</a>
    
    <p class="warning">This password reset link will expire in ${expiryTime}.</p>
    
    <div class="alert">
      <p><strong>Security Notice:</strong> If you did not request a password reset, please ignore this email and contact our support team immediately at <a href="mailto:security@roda.pk">security@roda.pk</a>.</p>
    </div>
    
    <p>Best regards,<br>The Security Team at ${companyName}</p>
  </div>
  <div class="footer">
    <p>&copy; ${currentYear} ${companyName}. All rights reserved.</p>
  </div>
</body>
</html>`,
    text: `Reset Your Password

Hello ${name},

We received a request to reset the password for your account. If you made this request, please click the link below to reset your password:

Reset password: ${resetLink}

This password reset link will expire in ${expiryTime}.

SECURITY NOTICE: If you did not request a password reset, please ignore this email and contact our support team immediately at security@roda.pk.

Best regards,
The Security Team at ${companyName}

© ${currentYear} ${companyName}. All rights reserved.`
  };
  
  return sendEmail(emailContent);
};

// Email verification helper with enhanced template
export const sendVerificationEmail = async (
  to: string, 
  name: string, 
  verificationLink: string, 
  verificationCode: string, 
  expiryTime: string
): Promise<boolean> => {
  const currentYear = new Date().getFullYear();
  const companyName = "RODA"; // Updated company name
  
  const emailContent = {
    to,
    subject: "Verify Your Email Address",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; color: #333;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f9fafb;">
          <tr>
            <td align="center" style="padding: 30px 0;">
              <table width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <!-- Header -->
                <tr>
                  <td align="center" style="background-color: #9b87f5; padding: 30px 30px 20px; border-radius: 8px 8px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Verify Your Email</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 30px 30px 20px;">
                    <p style="margin-top: 0; margin-bottom: 20px; font-size: 16px; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
                    
                    <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.6;">Thank you for creating an account with ${companyName}. To complete your registration and access all features, please verify your email address by clicking the button below:</p>
                    
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td align="center" style="padding: 20px 0 30px;">
                          <a href="${verificationLink}" target="_blank" style="background-color: #9b87f5; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">Verify My Email</a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.6;">Or copy and paste the following link into your browser:</p>
                    <p style="margin-bottom: 20px; font-size: 14px; line-height: 1.6; word-break: break-all; background-color: #f3f4f6; padding: 12px; border-radius: 6px; border-left: 4px solid #9b87f5;">${verificationLink}</p>
                    
                    ${verificationCode ? `
                    <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.6;">If requested, use this verification code:</p>
                    <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; padding: 15px; background-color: #E5DEFF; border: 1px dashed #9b87f5; border-radius: 4px; text-align: center; margin: 20px 0;">${verificationCode}</p>
                    ` : ''}
                    
                    <p style="margin-bottom: 8px; font-size: 16px; line-height: 1.6;">This link will expire in <strong>${expiryTime}</strong>.</p>
                    
                    <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px; margin-bottom: 0;">If you did not create an account with ${companyName}, please ignore this email or contact our support team at <a href="mailto:support@roda.pk" style="color: #9b87f5; text-decoration: none;">support@roda.pk</a> if you have any concerns about your account security.</p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px 30px; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">Best regards,<br>The ${companyName} Team</p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${currentYear} ${companyName}. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `Verify Your Email Address

Hello ${name},

Thank you for creating an account with ${companyName}. To complete your registration and access all features, please verify your email address by clicking the link below:

${verificationLink}

${verificationCode ? `Your verification code: ${verificationCode}` : ''}

This verification link will expire in ${expiryTime}.

If you did not create an account with ${companyName}, please ignore this email or contact our support team at support@roda.pk if you have any concerns about your account security.

Best regards,
The ${companyName} Team

© ${currentYear} ${companyName}. All rights reserved.`
  };
  
  return sendEmail(emailContent);
};
