const express = require("express");
const authController = require("../controllers/authController");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");
const router = express.Router();

router.post("/signUp", authController.signup);
router.post("/login", authController.login);

router
  .route("/refresh-token")

  .post(authController.refreshToken);


module.exports = router;
