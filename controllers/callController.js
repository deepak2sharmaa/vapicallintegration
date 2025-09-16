const twilioClient = require('../config/twilio');
const { handleVapiCall } = require('../services/vapiService');

exports.handleIncomingCall = (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  
  const gather = twiml.gather({
    numDigits: 1,
    action: '/voice/handle-choice',
    method: 'POST'
  });
  
  gather.say('Welcome to Hospital Call Center. Press 1 if you are already a registered customer. Press 2 if you want to register.');
  
  res.type('text/xml');
  res.send(twiml.toString());
};

exports.handleChoice = (req, res) => {
  const digit = req.body.Digits;
  const twiml = new Twilio.twiml.VoiceResponse();
  
  if (digit === '1') {
    twiml.say('Hi, I am scheduling an appointment for you. Our representative will contact you shortly.');
    twiml.hangup();
  } else if (digit === '2') {
    const gather = twiml.gather({
      numDigits: 1,
      action: '/voice/handle-registration',
      method: 'POST'
    });
    
    gather.say('Press 3 to receive registration details via SMS. Press 4 to speak with our AI assistant for help filling the form.');
  } else {
    twiml.say('Invalid option. Please try again.');
    twiml.redirect('/voice/incoming');
  }
  
  res.type('text/xml');
  res.send(twiml.toString());
};

exports.handleRegistration = async (req, res) => {
  const digit = req.body.Digits;
  const callerNumber = req.body.From;
  const twiml = new Twilio.twiml.VoiceResponse();
  
  if (digit === '3') {
    try {
      await twilioClient.messages.create({
        body: 'Thank you for choosing our hospital. Please visit our website to complete your registration: www.hospital.com/register',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: callerNumber
      });
      
      twiml.say('An SMS with registration details has been sent to your phone number.');
    } catch (error) {
      console.error('Error sending SMS:', error);
      twiml.say('Sorry, we encountered an error sending the SMS. Please try again later.');
    }
    
    twiml.hangup();
  } else if (digit === '4') {
    // Connect to Vapi AI assistant
    twiml.say('Connecting you to our AI assistant for registration help.');
    
    // This would typically involve transferring the call to Vapi
    // For now, we'll simulate the behavior
    handleVapiCall(callerNumber);
    
    twiml.hangup();
  } else {
    twiml.say('Invalid option. Please try again.');
    twiml.redirect('/voice/incoming');
  }
  
  res.type('text/xml');
  res.send(twiml.toString());
};