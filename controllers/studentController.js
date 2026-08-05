const {
  sendSuccess,
  sendError,
  capitalizeFirst,
} = require("../helpers/helpers");
const pool = require("../db/db");

exports.getAllStudents = async (req, res) => {
  const { city, batch, page, limit } = req.query;

  try {
    // Base query
    let query = "SELECT * FROM students";
    const values = [];
    const conditions = [];

    // City filter
    if (city) {
      conditions.push(`city = $${values.length + 1}`); // city = $1
      values.push(capitalizeFirst(city)); // "Lahore"
    }

    // Batch filter
    if (batch) {
      conditions.push(`batch = $${values.length + 1}`); // batch = $2
      values.push(batch); // "2021"
    }

    // Add WHERE clause if filters exist
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    // Pagination
    if (page && limit) {
      const pageNum = Number(page);
      const limitNum = Number(limit);

      const offset = (pageNum - 1) * limitNum;

      query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

      values.push(limitNum);
      values.push(offset);
    }

    const result = await pool.query(query, values);

    sendSuccess(res, 200, result.rows);
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Internal server error");
  }
};
