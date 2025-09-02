const notFoundHandler = (req, res, _next) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} was not found on this server.`,
    timestamp: new Date().toISOString(),
  });
};

module.exports = notFoundHandler;
