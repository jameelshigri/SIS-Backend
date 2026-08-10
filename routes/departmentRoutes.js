const express = require("express");
const {
  getAllDepartments,
  getTotalStud_Depart,
  getDepartById,
} = require("../controllers/departmentController");
const router = express.Router();

router.get("/", getAllDepartments);
router.get("/:id", getDepartById);

router.get("/total-students", getTotalStud_Depart);

module.exports = router;
