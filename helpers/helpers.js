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

function sendNotFound(res, status, result) {
  if (result.rows.length === 0)
    return res.status(status).json({
      success: false,
      error: "No record found",
    });
}

function updateError(body) {
  let schema = [firstname, lastname, address, city, batch];
  let errors = [];
  if (body.length === 0) errors.push("Empty body");
}

function capitalizeFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function studentValidator(req) {
  const { firstname, lastname, address, city, batch } = req.body;
  if (!firstname) return "First name required";
  if (!lastname) return "Last name required";
}
module.exports = {
  sendSuccess,
  sendError,
  capitalizeFirst,
  sendNotFound,
};
