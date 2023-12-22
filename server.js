// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const connectDB = require('./config/db');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const authRouter = require('./routes/authRouter');

// Load environment variables from a .env file if available
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware setup...
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({ secret: process.env.SECRET_KEY || 'udayraj', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configure passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant Management System!');
});

// Authentication routes
app.use('/auth', authRouter);

// Sign-in route
app.get('/signin', (req, res) => {
  res.render('signin');
});

// Login route
app.get('/login', (req, res) => {
  res.render('login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
