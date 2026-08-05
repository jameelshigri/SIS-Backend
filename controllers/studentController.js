const {
  sendSuccess,
  sendError,
  capitalizeFirst,
  sendNotFound,
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

exports.getStudentById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return sendError(res, 400, "Invalid id");
    }
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return sendError(res, 404, "Student not found");
    return sendSuccess(res, 200, result.rows[0]);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, error);
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { firstname, lastname, address, city, batch } = req.body;

    if (!lastname || !firstname) {
      return sendError(
        res,
        400,
        `${!firstname ? "First Name" : "Last Name"} is required`,
      );
    }
    const result = await pool.query(
      `INSERT INTO students
   (firstname, lastname, address, city, batch)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *`,
      [firstname, lastname, address, city, batch],
    );
    return sendSuccess(res, 201, result.rows[0]);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, "something went wrong");
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { firstname, lastname, address, city, batch } = req.body;
    if (Number.isNaN(id)) {
      return sendError(res, 400, "Invalid id");
    }
    if (!lastname || !firstname) {
      return sendError(
        res,
        400,
        `${!firstname ? "First Name" : "Last Name"} is required`,
      );
    }
    const result = await pool.query(
      `UPDATE students
       SET
      firstname = $1,
      lastname = $2,
      address = $3,
      city = $4,
      batch = $5
      WHERE id = $6
      RETURNING *`,
      [firstname, lastname, address, city, batch, id],
    );
    return sendSuccess(res, 201, result.rows[0]);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, "something went wrong");
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return sendError(res, 400, "Invalid id");
    }
    const result = await pool.query(
      "DELETE from students where id = $1 RETURNING *",
      [id],
    );
    return sendSuccess(res, 200, result.rows[0]);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, "something went wrong");
  }
};
