const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
const users = require("../controllers/userController");

router.route("/register").post(users.registerUser);
router.route("/login").post(users.loginUser);
router
  .route("/profile")
  .get(userMiddleware.authentication, users.getUser)
  .put(userMiddleware.authentication, users.updateUser)
  .delete(userMiddleware.authentication, users.deleteUser);

module.exports = router;
