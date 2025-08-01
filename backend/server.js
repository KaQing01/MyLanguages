require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); 

const restRoutes = require('./routes/words');
const authRoutes = require('./auth/authRoutes');
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: 'https://mylanguages.vercel.app',
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/words', restRoutes);
app.use('/auth', authRoutes);

mongoose 
  .connect(process.env.MONGODB_URI) 
  .then(() => console.log("Connected to MongoDB Atlas")) 
  .catch((err) =>  console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

