// const twilio = require('twilio');

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = twilio(accountSid, authToken);

// module.exports = client;



const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Add simple error checking
if (!accountSid || !authToken) {
  console.error('ERROR: Twilio credentials missing!');
  console.error('Make sure your .env file has TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN');
  // Instead of throwing error, we'll create a dummy client for now
  // This prevents the app from crashing during development
  module.exports = {
    messages: {
      create: async () => {
        console.log('Twilio not configured -模拟 SMS send');
        return { sid: 'simulated' };
      }
    }
  };
} else {
  const client = twilio(accountSid, authToken);
  module.exports = client;
}