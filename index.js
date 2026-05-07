const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// 1. CORS Middleware (so frontend can talk to backend)
app.use(cors());

// 2. JSON Body Parser (so backend can read JSON data sent from frontend)
app.use(express.json());

// 3. Mount Routes (connects user routes)
app.use('/api', userRoutes);

// 4. Simple Health Check (verify server is running on Render)
app.get('/', (req, res) => {
  res.send('Jamper Backend is Running! 🚀');
});

// 5. Connect to MongoDB
mongoose.connect(process.env.DATABASE)
  .then(() => console.log('✅ Connection to the DB secured !!!'))
  .catch((e) => console.log('❌ DB Error:', e.message));

// 6. Listen on Render's Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`📡 Server running on Port: ${PORT} !!!`));