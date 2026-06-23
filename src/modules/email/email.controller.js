const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { errorResponse } = require('../../utils/apiResponse');

// Simple direct render for development preview without using Resend
class EmailController {
  static async previewTemplate(req, res) {
    try {
      if (process.env.NODE_ENV === 'production' && !req.query.force) {
        return errorResponse(res, 403, 'Email preview is disabled in production');
      }

      const { template } = req.params;
      const TEMPLATE_DIR = path.join(__dirname, '../../templates/emails');

      // Register partials (just in case service isn't initialized)
      const headerSource = fs.readFileSync(path.join(TEMPLATE_DIR, 'components/header.hbs'), 'utf8');
      const footerSource = fs.readFileSync(path.join(TEMPLATE_DIR, 'components/footer.hbs'), 'utf8');
      handlebars.registerPartial('header', headerSource);
      handlebars.registerPartial('footer', footerSource);

      const templatePath = path.join(TEMPLATE_DIR, `${template}.hbs`);
      
      if (!fs.existsSync(templatePath)) {
        return res.status(404).send(`<h1>Template not found: ${template}</h1><p>Check the name and try again.</p>`);
      }

      const source = fs.readFileSync(templatePath, 'utf8');
      const compiled = handlebars.compile(source);

      // Mock data for preview
      const html = compiled({
        name: 'Alex Developer',
        role: 'restaurant',
        title: 'Application Approved',
        action: 'verify your email address',
        otp: '849201',
        expiryMins: 10,
        isApproved: true,
        isRejected: false,
        isSuspended: false,
        reason: 'Missing FSSAI license document.',
        mealsServed: 120,
        familiesHelped: 45,
        co2Saved: '32.5',
        dashboardUrl: 'http://localhost:3000/dashboard'
      });

      res.send(html);
    } catch (err) {
      console.error(err);
      res.status(500).send(`<h1>Error Rendering Template</h1><pre>${err.message}</pre>`);
    }
  }
}

module.exports = EmailController;
