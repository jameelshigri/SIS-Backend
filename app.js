const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const app = express();

const pool = require("./db/db");
require("dotenv").config();

app.use(express.json());

app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// const result = await db.query("SELECT * FROM users");

// res.json(result.rows);

// app.get("/test-db", async (req, res) => {
//   try {
//     // Basic test query checking current time from postgres server
//     const result = await pool.query("SELECT NOW()");
//     res.json({ message: "Successfully connected!", time: result.rows[0] });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Database connection error");
//   }
// });
