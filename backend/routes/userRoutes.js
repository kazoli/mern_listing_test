const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const users = require("../controllers/userController");

router.route("/login").post(users.loginUser);
router.route("/register").post(users.createUser);
router
  .route("/profile")
  .get(userMiddleware.authentication, users.getUser)
  .put(userMiddleware.authentication, users.updateUser)
  .delete(userMiddleware.authentication, users.deleteUser);

module.exports = router;
