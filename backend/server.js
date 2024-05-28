<<<<<<< HEAD
// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // For request logging
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const jitsiRoutes = require('./routes/jitsiRoutes'); // Import Jitsi routes
=======
//backend\server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
const passport = require('passport');
const session = require('express-session');

require('./config/passport');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
// Middleware setup
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
<<<<<<< HEAD
app.use(morgan('combined')); // Use morgan for request logging

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
=======

app.use(session({
    secret: 'your-secret-key',
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => {
    console.log('API is working');
    res.send('API is working');
});

<<<<<<< HEAD
// Database connection and synchronization
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync({ alter: true }); // Adjust as needed
=======
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync();
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    })
    .then(() => {
        console.log("Models synchronized successfully.");
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

<<<<<<< HEAD
// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/jitsi', jitsiRoutes);  // Use Jitsi routes

// Start the server
=======
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);

>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
