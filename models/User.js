// Import the Mongoose library
const mongoose = require('mongoose');

// Create a schema for the user data
const userSchema = new mongoose.Schema({
  // User's username 
  username: {
    type: String,
    unique: true,   
    required: true, 
    trim: true,     
  },
  
  // User's email address 
  email: {
    type: String,
    required: true,                     
    unique: true,                          
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], 
  },
  
  // User's thoughts 
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Thought',                       
    },
  ],

  // User's friends 
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',                          
    },
  ],
});

// Create a virtual property 'friendCount' for counting friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; 
});

// Create a 'User' model using the schema
const User = mongoose.model('User', userSchema);


module.exports = User;
