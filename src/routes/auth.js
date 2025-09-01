const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// POST /api/auth/register - Register new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

// POST /api/auth/logout - Logout user
router.post('/logout', auth, authController.logout);

// GET /api/auth/me - Get current user
router.get('/me', auth, authController.getMe);

// PUT /api/auth/update-profile - Update user profile
router.put('/update-profile', auth, authController.updateProfile);

// POST /api/auth/forgot-password - Forgot password
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password - Reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
