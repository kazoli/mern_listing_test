import asyncHandler from 'express-async-handler';
import { Collection } from '../models/index';
import { errorTrigger } from '../middlewares/errorMiddleware';
import { validateText } from './validationMiddleware';

// check collection exists and user has access it
export const collectionAccess = asyncHandler(async (collection_id, user_id, res) => {
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
    errorTrigger(res, 401, 'Collection is not available');
  }

  return collection;
});

// validation of values of a collection
export const collectionValidation = (values, res) => {
  if (values.name === undefined) {
    errorTrigger(res, 422, 'Some of collection data are missing');
  }
  // validate name and trim white spaces
  values.name = values.name.trim();
  const error = validateText('Collection name', values.name, 3, 50);
  if (error) {
    errorTrigger(res, 422, error);
  }
  return values;
};
