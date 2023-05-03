const asyncHandler = require("express-async-handler");
const { errorTrigger } = require("./errorMiddleware");
const { validateInput } = require("./validationMiddleware");

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
    errorTrigger(res, 400, "Collection does not available");
  }
});

// validation of values of a collection
const collectionValidation = (values) => {
  // validate name and trim white spaces
  values.name = values.name.trim();
  const error = validateInput(values.name, 3, 50);
  if (error) {
    errorTrigger(res, 400, error);
  }
  return values;
};

module.exports = {
  collectionAccess,
  collectionValidation,
};
