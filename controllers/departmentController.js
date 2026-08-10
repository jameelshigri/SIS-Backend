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
    sendError(res, 500, "Internal Server Error");
  }
};
exports.getDepartById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `Select * from departments where dep_id = $1`,
      [id],
    );
    sendSuccess(res, 200, result.rows[0]);
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Something went wrong");
  }
};
exports.getTotalStud_Depart = async (req, res) => {
  try {
    const result = await pool.query(`SELECT
    d.dep_id,
    d.Name AS department_name,
    COUNT(s.id) AS total_students
    FROM departments d
    LEFT JOIN students s ON d.dep_id = s.dep_id
    GROUP BY d.dep_id, d.Name ORDER BY d.dep_id ASC`);
    sendSuccess(res, 200, result.rows);
  } catch (error) {
    sendError(res, 500, "Internal Server Error");
  }
};
