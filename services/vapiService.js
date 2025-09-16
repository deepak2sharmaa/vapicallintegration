


// const axios = require('axios');

// const VAPI_BASE_URL = 'https://api.vapi.ai';
// const VAPI_API_KEY = process.env.VAPI_API_KEY;
// const VAPI_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID;

// // Actual VAPI call implementation
// exports.handleVapiCall = async (phoneNumber) => {
//   try {
//     console.log(`Initiating Vapi call to ${phoneNumber}`);
    
//     if (!VAPI_ASSISTANT_ID) {
//       throw new Error('VAPI_ASSISTANT_ID is missing from environment variables');
//     }

//     if (!VAPI_API_KEY) {
//       throw new Error('VAPI_API_KEY is missing from environment variables');
//     }

//     // Make the actual API call to VAPI
//     const response = await axios.post(
//       `${VAPI_BASE_URL}/call/phone`,
//       {
//         assistantId: VAPI_ASSISTANT_ID,
//         phoneNumber: {
//           twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
//           twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
//           twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER
//         },
//         customer: {
//           number: phoneNumber
//         }
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${VAPI_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     console.log('Vapi call initiated successfully:', response.data);
//     return { success: true, callId: response.data.id };
    
//   } catch (error) {
//     console.error('Error initiating Vapi call:', error.response?.data || error.message);
//     return { success: false, error: error.message };
//   }
// };

// // Webhook handler for VAPI transcripts
// exports.handleVapiWebhook = (req, res) => {
//   const event = req.body;
  
//   // Always respond immediately to acknowledge receipt
//   res.status(200).json({ success: true });
  
//   // Process the event based on its type
//   console.log(`Received VAPI event: ${event.type}`);
  
//   switch (event.type) {
//     case 'end-of-call-report':
//       console.log('=== CALL COMPLETED ===');
//       console.log('Duration:', event.duration, 'seconds');
//       console.log('Status:', event.status);
//       console.log('Ended by:', event.endedBy);
//       break;
      
//     case 'transcript':
//       if (event.transcriptType === 'final') {
//         console.log('=== FINAL TRANSCRIPT ===');
//         console.log(event.transcript);
//       }
//       break;
      
//     case 'conversation-update':
//       console.log('Conversation state updated');
//       break;
      
//     case 'status-update':
//       console.log('Status changed to:', event.status);
//       break;
      
//     default:
//       console.log('Event details:', JSON.stringify(event, null, 2));
//   }
  
//   // If messages are available, log them
//   if (event.messages && Array.isArray(event.messages)) {
//     console.log('=== CONVERSATION MESSAGES ===');
//     event.messages.forEach((message, index) => {
//       console.log(`${index + 1}. [${message.role}] ${message.message}`);
//     });
//   }
// };


const axios = require('axios');

const VAPI_BASE_URL = 'https://api.vapi.ai';
const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID;

// Actual VAPI call implementation
exports.handleVapiCall = async (phoneNumber) => {
  try {
    console.log(`Initiating Vapi call to ${phoneNumber}`);
    
    if (!VAPI_ASSISTANT_ID) {
      throw new Error('VAPI_ASSISTANT_ID is missing from environment variables');
    }

    if (!VAPI_API_KEY) {
      throw new Error('VAPI_API_KEY is missing from environment variables');
    }

    // Make the actual API call to VAPI
    const response = await axios.post(
      `${VAPI_BASE_URL}/call/phone`,
      {
        assistantId: VAPI_ASSISTANT_ID,
        phoneNumber: {
          twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
          twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
          twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER
        },
        customer: {
          number: phoneNumber
        }
        // REMOVED the invalid 'twiml' parameter
      },
      {
        headers: {
          'Authorization': `Bearer ${VAPI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Vapi call initiated successfully:', response.data);
    return { success: true, callId: response.data.id };
    
  } catch (error) {
    console.error('Error initiating Vapi call:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

// Webhook handler for VAPI transcripts
exports.handleVapiWebhook = (req, res) => {
  const event = req.body;
  
  // Always respond immediately to acknowledge receipt
  res.status(200).json({ success: true });
  
  // Process the event based on its type
  console.log(`Received VAPI event: ${event.type}`);
  
  switch (event.type) {
    case 'end-of-call-report':
      console.log('=== CALL COMPLETED ===');
      console.log('Duration:', event.duration, 'seconds');
      console.log('Status:', event.status);
      console.log('Ended by:', event.endedBy);
      break;
      
    case 'transcript':
      if (event.transcriptType === 'final') {
        console.log('=== FINAL TRANSCRIPT ===');
        console.log(event.transcript);
      }
      break;
      
    case 'conversation-update':
      console.log('Conversation state updated');
      break;
      
    case 'status-update':
      console.log('Status changed to:', event.status);
      break;
      
    default:
      console.log('Event details:', JSON.stringify(event, null, 2));
  }
  
  // If messages are available, log them
  if (event.messages && Array.isArray(event.messages)) {
    console.log('=== CONVERSATION MESSAGES ===');
    event.messages.forEach((message, index) => {
      console.log(`${index + 1}. [${message.role}] ${message.message}`);
    });
  }
};