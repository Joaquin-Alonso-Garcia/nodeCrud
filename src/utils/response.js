function sendSuccess(res, data, status = 200) {
  res.status(status).json({
    success: true,
    data,
    status
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
