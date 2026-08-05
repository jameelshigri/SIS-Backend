const express = require("express");
const {
  getAllStudents,
  getStudentById,
  addStudent,
} = require("../controllers/studentController");
const router = express.Router();

router.get("/", getAllStudents);

router.get("/:id", getStudentById);

router.post("/", addStudent);

module.exports = router;
