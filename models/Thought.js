// Import the Mongoose library
const mongoose = require('mongoose');

// Create a schema for the thought data
const thoughtSchema = new mongoose.Schema({
  // The text of the thought 
  thoughtText: {
    type: String,
    required: true,     
    minlength: 1,      
    maxlength: 280,     
  },
  
  // creation date of the thought 
  createdAt: {
    type: Date,
    default: Date.now,  
    get: (createdAt) => dateFormat(createdAt),  
  },
  
  // The username of the user who created the thought 
  username: {
    type: String,
    required: true,     
  },
  
  // Reactions to the thought 
  reactions: [
    {
      // Unique ID for each reaction 
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      
      // The text of the reaction 
      reactionBody: {
        type: String,
        required: true,     
        maxlength: 280,    
      },
      
      // The username of the user who reacted 
      username: {
        type: String,
        required: true,   
      },
      
      // The creation date of the reaction (a date)
      createdAt: {
        type: Date,
        default: Date.now,  
        get: (createdAt) => dateFormat(createdAt),  
      },
    },
  ],
});

// Create a virtual property 'reactionCount' for counting reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; 
});

// Create a 'Thought' model using the schema
const Thought = mongoose.model('Thought', thoughtSchema);


module.exports = Thought;
