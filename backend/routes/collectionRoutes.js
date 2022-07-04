const express = require("express");
const router = express.Router();
const collections = require("../controllers/collectionController");

router
  .route("/")
  .get(collections.getCollections)
  .post(collections.createCollection)
  //collection ID is comming among posted data
  .put(collections.updateCollection);
router.route("/:id").delete(collections.deleteCollection);

module.exports = router;
