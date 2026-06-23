const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');
const TEMPLATE_DIR = path.join(__dirname, '../../templates/emails');

// Register partials
const headerSource = fs.readFileSync(path.join(TEMPLATE_DIR, 'components/header.hbs'), 'utf8');
const footerSource = fs.readFileSync(path.join(TEMPLATE_DIR, 'components/footer.hbs'), 'utf8');
handlebars.registerPartial('header', headerSource);
handlebars.registerPartial('footer', footerSource);

// Cache compiled templates
const compiledTemplates = {};

const getTemplate = (templateName) => {
  if (!compiledTemplates[templateName]) {
    const templatePath = path.join(TEMPLATE_DIR, `${templateName}.hbs`);
    const source = fs.readFileSync(templatePath, 'utf8');
    compiledTemplates[templateName] = handlebars.compile(source);
  }
  return compiledTemplates[templateName];
};

class EmailService {
  /**
   * Send email using Resend with basic retry logic
   */
  static async sendEmailWithRetry(to, subject, html, retries = 3) {
    if (!process.env.RESEND_API_KEY) {
      console.log(`📧 [EMAIL SKIPPED — NO API KEY] To: ${to} | Subject: ${subject}`);
      return { success: true, simulated: true };
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const { data, error } = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'FoodRescue <foodrescuesupport@gmail.com>', // Usually needs verified domain, but using gmail for config
          to,
          subject,
          html,
        });

        if (error) throw error;
        
        console.log(`📧 Email sent to ${to} (Attempt ${attempt})`);
        return { success: true, data };
      } catch (err) {
        console.error(`❌ Email failed to ${to} (Attempt ${attempt}/${retries}):`, err.message);
        if (attempt === retries) {
          // In a real production system, push to a DLQ or Firestore for later retry
          return { success: false, error: err.message };
        }
        // Exponential backoff: wait 1s, 2s, 4s...
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  static async sendWelcomeEmail(to, name, role, applicationId = 'N/A') {
    const templateName = `welcome_${role}`;
    const template = getTemplate(templateName);
    const html = template({ name, applicationId, dashboardUrl: process.env.ALLOWED_ORIGINS || 'https://foodsrescue.vercel.app' });
    
    return this.sendEmailWithRetry(to, 'Welcome to FoodRescue 🎉', html);
  }

  static async sendOTPVerification(to, name, otp, purpose = 'login', expiryMins = 10) {
    const template = getTemplate('otp_verification');
    const configs = {
      login: { title: 'Your Login Code', action: 'log in to your FoodRescue account' },
      register: { title: 'Verify Your Email', action: 'verify your email address' },
      reset: { title: 'Reset Password Code', action: 'reset your FoodRescue password' }
    };
    const { title, action } = configs[purpose] || configs.login;
    
    const html = template({ name, otp, title, action, expiryMins });
    
    return this.sendEmailWithRetry(to, `${otp} — Your FoodRescue code`, html);
  }

  static async sendApplicationStatus(to, name, role, status, reason = null) {
    const template = getTemplate('application_status');
    let title = 'Application Update';
    let isApproved = false, isRejected = false, isSuspended = false;

    switch (status) {
      case 'APPROVED': title = 'Application Approved'; isApproved = true; break;
      case 'REJECTED': title = 'Application Rejected'; isRejected = true; break;
      case 'SUSPENDED': title = 'Account Suspended'; isSuspended = true; break;
      case 'BANNED': title = 'Account Banned'; isSuspended = true; break;
    }

    const html = template({
      name, role, title, reason,
      isApproved, isRejected, isSuspended,
      dashboardUrl: process.env.ALLOWED_ORIGINS || 'https://foodsrescue.vercel.app'
    });

    return this.sendEmailWithRetry(to, `FoodRescue: ${title}`, html);
  }

  static async sendDonationCompleted(to, name, mealsServed, familiesHelped, co2Saved) {
    const template = getTemplate('donation_completed');
    const html = template({
      name, mealsServed, familiesHelped, co2Saved,
      dashboardUrl: process.env.ALLOWED_ORIGINS || 'https://foodsrescue.vercel.app'
    });

    return this.sendEmailWithRetry(to, 'Donation Completed! 🎉', html);
  }
}

module.exports = EmailService;
