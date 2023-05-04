const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware");
const collections = require("../controllers/collectionController");

router
  .route("/")
  .get(userMiddleware.authentication, collections.getCollections)
  .post(userMiddleware.authentication, collections.createCollection)
  .put(userMiddleware.authentication, collections.updateCollection);
router
  .route("/:id")
  .delete(userMiddleware.authentication, collections.deleteCollection);

module.exports = router;
