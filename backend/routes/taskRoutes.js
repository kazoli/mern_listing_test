const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const tasks = require("../controllers/taskController");

router.route("/:collection_id").get(userMiddleware.auth, tasks.getTasks);
router
  .route("/")
  .post(userMiddleware.authentication, tasks.createTask)
  .put(userMiddleware.authentication, tasks.updateTask);
// :id is task ID
router.route("/:id").delete(userMiddleware.authentication, tasks.deleteTask);

module.exports = router;
