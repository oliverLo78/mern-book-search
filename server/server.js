const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs'); 
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');

// Suppress Mongoose deprecation warning
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3001;
const app = express();
let buildPath; // Declare buildPath at the top level

// Configure Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false,
  cache: 'bounded',
  introspection: true,
  playground: true
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-book-search',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000
      }
    );
    console.log(`✅ MongoDB connected to ${process.env.MONGODB_URI ? 'Atlas' : 'localhost'}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  buildPath = path.join(__dirname, '../client/build');
  console.log(`Looking for build files at: ${buildPath}`);
  
  if (!fs.existsSync(buildPath)) {
    console.error('❌ Client build not found. Run in terminal:');
    console.log('1. cd client');
    console.log('2. npm run build');
    console.log('3. cd ..');
    console.log('4. git add client/build');
    process.exit(1);
  }

  app.use(express.static(buildPath));
}

// Health check endpoint
app.get('/db-check', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    res.json({
      status: states[dbState],
      dbName: mongoose.connection.name,
      atlas: process.env.MONGODB_URI?.includes('mongodb+srv') || false
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all route for React in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Start server
const startApolloServer = async () => {
  await connectToDatabase(); // Ensure DB connection first
  await server.start();
  
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log('\n🚀 Server launched');
    console.log(`🔗 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
    if (process.env.NODE_ENV === 'production') {
      console.log('🌐 React app served from /client/build');
    }
  });
};

startApolloServer();