'use strict';

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();
const PORT = 3001;

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// TEST ROOT
app.get('/', (req, res) => {
  res.json({ message: 'Library UCP API is running' });
});

// ROUTES
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// 🔥 GLOBAL ERROR HANDLER (INI KUNCI FIX)
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

// START SERVER
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
