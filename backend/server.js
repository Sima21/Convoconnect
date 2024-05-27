//backend\server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const passport = require('passport');
const session = require('express-session');

require('./config/passport');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => {
    res.send('API is working');
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync();
    })
    .then(() => {
        console.log("Models synchronized successfully.");
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
