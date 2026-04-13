const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

// 🔒 Protected route
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected data',
    user: req.user
  });
});

module.exports = router;