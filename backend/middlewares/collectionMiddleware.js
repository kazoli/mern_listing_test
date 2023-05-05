const asyncHandler = require("express-async-handler");
const { errorTrigger } = require("./errorMiddleware");
const { validateInput } = require("./validationMiddleware");
const { Collection } = require("../models/index");

// check collection exists and user has access it
const collectionAccess = asyncHandler(async (collection_id, user_id, res) => {
  let collection;
  try {
    collection = await Collection.findOne({
      _id: collection_id,
      user_id: user_id,
    });
  } catch (error) {
    console.error(error);
    collection = false;
  }
  if (!collection) {
    errorTrigger(res, 401, "Collection is not available");
  }

  return collection;
});

// validation of values of a collection
const collectionValidation = (values, res) => {
  if (values.name === undefined) {
    errorTrigger(res, 422, "Some of collection data are missing");
  }
  // validate name and trim white spaces
  values.name = values.name.trim();
  const error = validateInput("Collection name", values.name, 3, 50);
  if (error) {
    errorTrigger(res, 422, error);
  }
  return values;
};

module.exports = {
  collectionAccess,
  collectionValidation,
};
