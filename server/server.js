const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const mongoose = require('mongoose');

// Suppress Mongoose deprecation warning
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');

  // Check if the build directory exists
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    // Serve the React app for all routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
  } else {
    console.error('Error: The "client/build" directory does not exist. Run `npm run build` in the client directory first.');
    process.exit(1);
  }
}

// Start Apollo Server and Express
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);