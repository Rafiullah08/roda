
/**
 * Email templates for partner application status notifications
 */

export interface PartnerEmailData {
  partnerName: string;
  businessName: string;
  partnerEmail: string;
  rejectionReason?: string;
}

/**
 * Creates HTML content for partner approval email
 */
export const createPartnerApprovalEmail = (data: PartnerEmailData): { subject: string; html: string } => {
  const subject = `🎉 Your Partner Application Has Been Approved - ${data.businessName}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #16a34a; margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
        </div>
        
        <h2 style="color: #333; margin-bottom: 20px;">Your Partner Application Has Been Approved</h2>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">Dear ${data.partnerName},</p>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
          We're excited to inform you that your partner application for <strong>${data.businessName}</strong> has been approved! 
          Welcome to our partner network.
        </p>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 15px; margin: 20px 0;">
          <p style="color: #166534; margin: 0; font-weight: 500;">
            You can now access your partner dashboard and start offering your services to our customers.
          </p>
        </div>
        
        <h3 style="color: #333; margin-top: 30px; margin-bottom: 15px;">Next Steps:</h3>
        <ul style="color: #555; line-height: 1.6; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Log in to your account and access the Partner Dashboard</li>
          <li style="margin-bottom: 10px;">Complete your partner profile and add your services</li>
          <li style="margin-bottom: 10px;">Set up your service offerings and pricing</li>
          <li style="margin-bottom: 10px;">Start receiving and managing customer inquiries</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://preview--roda-service-hub.lovable.app/partner-dashboard" 
             style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
            Access Partner Dashboard
          </a>
        </div>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
          If you have any questions or need assistance getting started, please don't hesitate to contact our partner support team.
        </p>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 5px;">
          Best regards,<br>
          <strong>The RODA Partner Team</strong>
        </p>
      </div>
    </div>
  `;

  return { subject, html };
};

/**
 * Creates HTML content for partner rejection email
 */
export const createPartnerRejectionEmail = (data: PartnerEmailData): { subject: string; html: string } => {
  const subject = `Partner Application Update - ${data.businessName}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 28px;">Application Update</h1>
        </div>
        
        <h2 style="color: #333; margin-bottom: 20px;">Partner Application Status</h2>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">Dear ${data.partnerName},</p>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
          Thank you for your interest in becoming a partner with us. After careful review, we regret to inform you that 
          we cannot approve your partner application for <strong>${data.businessName}</strong> at this time.
        </p>
        
        ${data.rejectionReason ? `
        <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
          <h4 style="color: #991b1b; margin: 0 0 10px 0;">Reason for rejection:</h4>
          <p style="color: #7f1d1d; margin: 0;">${data.rejectionReason}</p>
        </div>
        ` : ''}
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
          This decision does not reflect on the quality of your business, and you are welcome to reapply in the future 
          once you've addressed any areas for improvement.
        </p>
        
        <h3 style="color: #333; margin-top: 30px; margin-bottom: 15px;">What you can do:</h3>
        <ul style="color: #555; line-height: 1.6; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Review the feedback provided and work on improvements</li>
          <li style="margin-bottom: 10px;">Consider gaining additional experience or certifications</li>
          <li style="margin-bottom: 10px;">Reapply when you feel ready</li>
          <li style="margin-bottom: 10px;">Contact our support team if you have questions</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://preview--roda-service-hub.lovable.app/become-partner" 
             style="background-color: #6b7280; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
            Apply Again
          </a>
        </div>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
          Thank you for your understanding, and we wish you success in your future endeavors.
        </p>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 5px;">
          Best regards,<br>
          <strong>The RODA Partner Team</strong>
        </p>
      </div>
    </div>
  `;

  return { subject, html };
};
