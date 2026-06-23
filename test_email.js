require('dotenv').config();
const { sendEmail } = require('./src/config/email');

async function test() {
  console.log('Sending test email...');
  const result = await sendEmail(
    'mahendragdgssasit@gmail.com',
    'Test Email',
    '<p>This is a test email</p>'
  );
  console.log('Result:', result);
}

test();
