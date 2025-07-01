function sendSuccess(res, data, status = 200, count = null, message = null) {
  res.status(status).json({
    success: true,
    data,
    count,
    message
  });
}

function sendError(res, message, status = 500) {
  res.status(status).json({
    success: false,
    message
  });
}

module.exports = {
  sendSuccess,
  sendError
};
