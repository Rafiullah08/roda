
import { CreateEmailTemplateParams } from "./types";

/**
 * Creates a default welcome email template
 */
export const createWelcomeEmailTemplate = (): CreateEmailTemplateParams => {
  return {
    name: "Welcome Email",
    type: "welcome",
    subject: "Welcome to Our Platform",
    html_content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Welcome to Our Platform!</h1>
        <p>Hello {{user_name}},</p>
        <p>Thank you for joining {{company_name}}! We're excited to have you on board.</p>
        <p>With your new account, you can:</p>
        <ul>
          <li>Access our complete service catalog</li>
          <li>Track your orders and purchases</li>
          <li>Manage your profile and preferences</li>
        </ul>
        <p>To get started, please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="{{activation_link}}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">Activate Your Account</a>
        </div>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The {{company_name}} Team</p>
      </div>
    `,
    variables: [
      { name: "user_name", description: "The name of the user" },
      { name: "company_name", description: "The name of your company" },
      { name: "activation_link", description: "The link to activate the account" }
    ],
    is_active: true
  };
};

/**
 * Creates a default password reset email template
 */
export const createPasswordResetTemplate = (): CreateEmailTemplateParams => {
  return {
    name: "Password Reset",
    type: "password_reset",
    subject: "Password Reset Request",
    html_content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p>Hello {{user_name}},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, click the button below. This link is valid for {{expiry_time}}.</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="{{reset_link}}" style="background-color: #4285F4; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">Reset Your Password</a>
        </div>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;">{{reset_link}}</p>
        <p>Best regards,<br>The Support Team</p>
      </div>
    `,
    variables: [
      { name: "user_name", description: "The name of the user" },
      { name: "reset_link", description: "The password reset link" },
      { name: "expiry_time", description: "The expiry time for the reset link" }
    ],
    is_active: true
  };
};

/**
 * Creates a default email verification template
 */
export const createVerificationEmailTemplate = (): CreateEmailTemplateParams => {
  return {
    name: "Email Verification",
    type: "verification",
    subject: "Verify Your Email Address",
    html_content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Verify Your Email Address</h1>
        <p>Hello {{user_name}},</p>
        <p>Thank you for registering. To complete your registration and verify your email address, please click the button below:</p>
        <div style="text-align: center; margin: 25px 0;">
          <a href="{{verification_link}}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">Verify Email Address</a>
        </div>
        <p>This link will expire in {{expiry_time}}.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>The Support Team</p>
      </div>
    `,
    variables: [
      { name: "user_name", description: "The name of the user" },
      { name: "verification_link", description: "The verification link" },
      { name: "expiry_time", description: "The expiry time for the verification link" }
    ],
    is_active: true
  };
};

/**
 * Creates a default account change notification template
 */
export const createAccountChangeTemplate = (): CreateEmailTemplateParams => {
  return {
    name: "Account Change Notification",
    type: "account_change",
    subject: "Your Account Information Has Been Updated",
    html_content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Account Update Notification</h1>
        <p>Hello {{user_name}},</p>
        <p>This is to inform you that your account information has been updated recently.</p>
        <p><strong>Change details:</strong></p>
        <ul>
          <li>Type of change: {{change_type}}</li>
          <li>Date and time: {{change_date}}</li>
        </ul>
        <p>If you made this change, no further action is required.</p>
        <p>If you did not authorize this change, please contact our support team immediately by replying to this email or through our support portal.</p>
        <p>Best regards,<br>The Security Team</p>
      </div>
    `,
    variables: [
      { name: "user_name", description: "The name of the user" },
      { name: "change_type", description: "The type of account change" },
      { name: "change_date", description: "The date when the change was made" }
    ],
    is_active: true
  };
};

/**
 * Creates a default security alert template
 */
export const createSecurityAlertTemplate = (): CreateEmailTemplateParams => {
  return {
    name: "Security Alert",
    type: "security_alert",
    subject: "Security Alert - Action Required",
    html_content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #D32F2F;">Security Alert</h1>
        <p>Hello {{user_name}},</p>
        <p>We detected a {{alert_type}} on your account at {{alert_time}} from {{location}}.</p>
        <p>Device information:</p>
        <ul>
          <li>Device: {{device}}</li>
          <li>Browser: {{browser}}</li>
          <li>IP Address: {{ip_address}}</li>
        </ul>
        <p>If this was you, no action is required.</p>
        <p>If you don't recognize this activity, please secure your account immediately by:</p>
        <ol>
          <li>Changing your password</li>
          <li>Enabling two-factor authentication if not already enabled</li>
          <li>Contacting our support team</li>
        </ol>
        <div style="text-align: center; margin: 25px 0;">
          <a href="{{security_link}}" style="background-color: #D32F2F; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">Secure Your Account</a>
        </div>
        <p>Best regards,<br>The Security Team</p>
      </div>
    `,
    variables: [
      { name: "user_name", description: "The name of the user" },
      { name: "alert_type", description: "The type of security alert" },
      { name: "alert_time", description: "The time when the alert was triggered" },
      { name: "location", description: "The location of the activity" },
      { name: "device", description: "The device used" },
      { name: "browser", description: "The browser used" },
      { name: "ip_address", description: "The IP address of the activity" },
      { name: "security_link", description: "Link to security settings" }
    ],
    is_active: true
  };
};

/**
 * Creates an order confirmation email template
 */
export const createOrderConfirmationTemplate = (): CreateEmailTemplateParams => {
  return {
    name: "Order Confirmation",
    type: "order_confirmation",
    subject: "Your Order Has Been Confirmed",
    html_content: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Order Confirmation</h1>
        <p>Hello {{customer_name}},</p>
        <p>Thank you for your order. We're pleased to confirm that your order has been received and is being processed.</p>
        
        <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0;">Order Details</h2>
          <p><strong>Order Number:</strong> {{order_number}}</p>
          <p><strong>Order Date:</strong> {{order_date}}</p>
          <p><strong>Total Amount:</strong> {{order_total}}</p>
          <p><strong>Estimated Delivery:</strong> {{delivery_date}}</p>
        </div>
        
        <h3 style="color: #333;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Service</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
          </tr>
          {{order_items}}
          <tr>
            <td style="padding: 10px; text-align: left; font-weight: bold;">Total</td>
            <td style="padding: 10px; text-align: right; font-weight: bold;">{{order_total}}</td>
          </tr>
        </table>
        
        <div style="margin: 25px 0;">
          <p>You can track your order status by clicking the button below:</p>
          <div style="text-align: center;">
            <a href="{{order_tracking_link}}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Track Your Order</a>
          </div>
        </div>
        
        <p>If you have any questions about your order, please contact our customer service team.</p>
        <p>Thank you for choosing our services!</p>
        <p>Best regards,<br>The Customer Support Team</p>
      </div>
    `,
    variables: [
      { name: "customer_name", description: "The name of the customer" },
      { name: "order_number", description: "The order reference number" },
      { name: "order_date", description: "The date when the order was placed" },
      { name: "order_total", description: "The total amount of the order" },
      { name: "delivery_date", description: "The estimated delivery date" },
      { name: "order_items", description: "The HTML for order line items" },
      { name: "order_tracking_link", description: "The link to track the order status" }
    ],
    is_active: true
  };
};
