// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data with extended format
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB database named 'social-network'
mongoose.connect('mongodb://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('debug', true);

// Define routes for user-related and thought-related APIs
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/thoughts', require('./routes/thought-routes'));

// Include the new friend-related routes
app.use('/api/friends', require('./routes/friend-routes'));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


