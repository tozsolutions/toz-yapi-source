const { ApiError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

// Mock database for demonstration (replace with actual database in production)
let users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    createdAt: new Date().toISOString()
  }
];

const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedUsers = users.slice(startIndex, endIndex);

  logger.info(`Retrieved ${paginatedUsers.length} users for page ${page}`);

  res.json({
    data: paginatedUsers,
    pagination: {
      page,
      limit,
      total: users.length,
      totalPages: Math.ceil(users.length / limit)
    }
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  logger.info(`Retrieved user with ID: ${id}`);
  res.json(user);
};

const createUser = async (req, res) => {
  const { name, email } = req.body;

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new ApiError(400, 'Email already exists');
  }

  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  logger.info(`Created new user with ID: ${newUser.id}`);

  res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    throw new ApiError(404, 'User not found');
  }

  // Check if email already exists (excluding current user)
  if (email) {
    const existingUser = users.find(u => u.email === email && u.id !== id);
    if (existingUser) {
      throw new ApiError(400, 'Email already exists');
    }
  }

  // Update user
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  users[userIndex].updatedAt = new Date().toISOString();

  logger.info(`Updated user with ID: ${id}`);
  res.json(users[userIndex]);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new ApiError(404, 'User not found');
  }

  users.splice(userIndex, 1);
  logger.info(`Deleted user with ID: ${id}`);

  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
