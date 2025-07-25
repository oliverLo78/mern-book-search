const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs'); 
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const mongoose = require('mongoose');

// Suppress Mongoose deprecation warning
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3001;
const app = express();

// Configure Apollo Server with security fixes
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false,  // Disable vulnerable feature
  cache: 'bounded',        // Prevent memory exhaustion attacks
  introspection: true,     // Recommended for production
  playground: true         // Enable GraphQL playground in production
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  
  if (!fs.existsSync(buildPath)) {
    console.error('❌ Error: Missing client build directory');
    console.log('💡 Solution: Run `npm run build` in the client folder');
    process.exit(1);
  }

  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Database connection with error handling
db.on('error', (err) => {
  console.error('🚨 MongoDB connection error:', err);
});

// Start Apollo Server and Express
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log('\n🚀 Server launched');
      console.log(`🔗 GraphQL ready at http://localhost:${PORT}${server.graphqlPath}`);
      if (process.env.NODE_ENV === 'production') {
        console.log('🌐 React app served from /client/build');
      }
    });
  });
};

startApolloServer();