const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ FIRST create app

const authRoutes = require('./routes/authRoutes');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// test route
app.get('/', (req, res) => {
  res.send('API Running...');
});

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
const itemRoutes = require('./routes/itemRoutes');

app.use('/api/items', itemRoutes);