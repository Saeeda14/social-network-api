// routes/friend-routes.js
const express = require('express');
const router = express.Router();
const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} = require('../controllers/friend-controller');

router.post('/send-request', sendFriendRequest);
router.post('/accept-request', acceptFriendRequest);
router.post('/reject-request', rejectFriendRequest);
router.post('/remove-friend', removeFriend);

module.exports = router;
