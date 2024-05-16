const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database'); // Import Sequelize configuration

dotenv.config(); // To use environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// In your server.js or wherever you configure your routes
app.get('/api', (req, res) => {
    res.send('API is working');
});

// Establish connection to PostgreSQL using Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // Sync all defined models to the DB
    sequelize.sync().then(() => {
      console.log("Models synchronized successfully.");
    }).catch(err => {
      console.error("Error syncing models:", err);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
