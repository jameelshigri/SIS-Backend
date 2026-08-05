// helpers/helper.js

function sendSuccess(res, status, data) {
  res.status(status).json({
    success: true,
    data,
  });
}

function sendError(res, status, message) {
  res.status(status).json({
    success: false,
    error: message,
  });
}
function capitalizeFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
module.exports = {
  sendSuccess,
  sendError,
  capitalizeFirst,
};
