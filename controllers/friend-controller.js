// controllers/friend-controller.js
const User = require('../models/User');

// Controller to send a friend request
const sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Check if the user and friend exist in the database
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if the friend request already exists
    if (user.friends.includes(friendId) || friend.friends.includes(userId)) {
      return res.status(400).json({ error: 'Friend request already exists' });
    }

    // Add friendId to user's friend list and vice versa
    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to accept a friend request
const acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Check if the user and friend exist in the database
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if the friend request exists
    if (!user.friends.includes(friendId) || !friend.friends.includes(userId)) {
      return res.status(400).json({ error: 'Friend request does not exist' });
    }

    // Remove the friend request and add each other as friends
    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to reject a friend request
const rejectFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Check if the user and friend exist in the database
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if the friend request exists
    if (!user.friends.includes(friendId) || !friend.friends.includes(userId)) {
      return res.status(400).json({ error: 'Friend request does not exist' });
    }

    // Remove the friend request
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== userId);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend request rejected' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to remove a friend
const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Check if the user and friend exist in the database
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if they are friends
    if (!user.friends.includes(friendId) || !friend.friends.includes(userId)) {
      return res.status(400).json({ error: 'Not friends with this user' });
    }

    // Remove each other from friend lists
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== userId);

    await user.save();
    await friend.save();

    res.json({ message: 'Friend removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
};
