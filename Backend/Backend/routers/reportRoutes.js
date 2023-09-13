const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

router
  .route("/")
  .get(protect, reportController.getAllReports)
  .post(protect, restrictTo("admin"), reportController.careteReport);

router
  .route("/:id")
  .get(protect,reportController.getReport)
  .patch(protect, restrictTo("admin"), reportController.updateReport)
  .delete(protect, restrictTo("admin"), reportController.deleteReport);
module.exports = router;
