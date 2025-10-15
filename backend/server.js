const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');

// Import models to ensure they are registered with Sequelize
require('./models/User');
require('./models/Report');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test the connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('MySQL database connected successfully');
    // Sync all models
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database tables synchronized');
  })
  .catch(err => console.error('Unable to connect to the database:', err));

app.use('/api/auth', authRoutes);
app.use('/api/review', reviewRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));