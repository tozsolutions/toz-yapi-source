const { validationResult } = require('express-validator');
const User = require('../models/User');
const logger = require('../utils/logger');

// @desc    Get all users with pagination
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        error: 'Invalid pagination parameters',
      });
    }

    const skip = (page - 1) * limit;

    // Build search query
    const query = { isActive: true };
    if (search) {
      query.$text = { $search: search };
    }

    // Get users with pagination
    const [users, totalUsers] = await Promise.all([
      User.find(query)
        .select('-password -passwordResetToken -passwordResetExpires')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        limit,
      },
    });
  } catch (error) {
    logger.error('Get users error:', error);
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const { id } = req.params;

    const user = await User.findById(id)
      .select('-password -passwordResetToken -passwordResetExpires')
      .lean();

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (!user.isActive) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json(user);
  } catch (error) {
    logger.error('Get user by ID error:', error);
    next(error);
  }
};

// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password -passwordResetToken -passwordResetExpires')
      .lean();

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account is deactivated',
      });
    }

    res.json(user);
  } catch (error) {
    logger.error('Get profile error:', error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const { name } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        error: 'Account is deactivated',
      });
    }

    // Update fields
    if (name) user.name = name;

    await user.save();

    logger.info(`User profile updated: ${user.email}`);

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    logger.error('Update profile error:', error);
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  getProfile,
  updateProfile,
};
