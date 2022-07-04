const express = require("express");
const router = express.Router();
const tasks = require("../controllers/taskController");

router.route("/:collection_id").get(tasks.getTasks);
// IDs are comming in body with other data
router.route("/").post(tasks.createTask).put(tasks.updateTask);
// id is task ID
router.route("/:id").delete(tasks.deleteTask);

module.exports = router;
