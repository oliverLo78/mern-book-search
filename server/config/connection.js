const mongoose = require('mongoose');

// Connection to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernbook',
  {
    useNewUrlParser: true, // Recommended for compatibility
    useUnifiedTopology: true, // Use MongoDB's new connection management engine
  }
);

// Event listeners for debugging
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB successfully!');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB.');
});

module.exports = mongoose.connection;

