// const express = require('express');
// const dotenv = require('dotenv');
// const voiceRoutes = require('./routes/voiceRoutes');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use('/voice', voiceRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const dotenv = require('dotenv');

// Load environment variables FIRST before any other imports
dotenv.config();

// Now import other modules
const voiceRoutes = require('./routes/voiceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/voice', voiceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});