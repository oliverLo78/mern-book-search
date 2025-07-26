const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-book-search';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
  socketTimeoutMS: 45000 // Give up if queries take >45s
};

mongoose.connect(DB_URI, options)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Crash the app to trigger Heroku restart
  });

mongoose.connection.on('disconnected', () => 
  console.log('ℹ️ MongoDB disconnected'));