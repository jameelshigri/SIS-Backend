const {
  sendSuccess,
  sendError,
  capitalizeFirst,
  sendNotFound,
} = require("../helpers/helpers");
const pool = require("../db/db");

exports.getAllDepartments = async (req, res) => {
  try {
    const result = await pool.query("Select * From departments");
    sendSuccess(res, 200, result.rows);
  } catch (error) {
    console.log(error);
  }
};
