const { validationResult } = require('express-validator');
const { ApiError } = require('./errorHandler');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value
    }));

    throw new ApiError(400, 'Validation Error', true, JSON.stringify(errorMessages));
  }
  next();
};

module.exports = { validate };
