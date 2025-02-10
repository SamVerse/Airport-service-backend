const {StatusCodes} = require('http-status-codes');

const info = (req, res) => {
  return res.status(StatusCodes.ACCEPTED).json({
    success: true,
    message: "Welcome to the API",
    error: {},
    data: {},
  });
};

module.exports = {
  info,
};
