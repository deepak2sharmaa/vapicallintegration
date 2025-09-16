const express = require('express');
const {
  handleIncomingCall,
  handleChoice,
  handleRegistration
} = require('../controllers/callController');
const { handleVapiWebhook } = require('../services/vapiService');

const router = express.Router();

router.post('/incoming', handleIncomingCall);
router.post('/handle-choice', handleChoice);
router.post('/handle-registration', handleRegistration);
router.post('/vapi-webhook', handleVapiWebhook);

module.exports = router;