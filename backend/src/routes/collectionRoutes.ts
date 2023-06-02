import express from 'express';
import { userAuthentication } from '../middlewares/userMiddleware';
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from '../controllers/collectionController';

export const collectionRouter = express.Router();

collectionRouter
  .route('/')
  .get(userAuthentication, getCollections)
  .post(userAuthentication, createCollection)
  .put(userAuthentication, updateCollection);

collectionRouter.route('/:_id').delete(userAuthentication, deleteCollection);
