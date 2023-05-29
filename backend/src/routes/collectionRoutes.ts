import express from 'express';
import { authentication } from '../middlewares/userMiddleware';
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from '../controllers/collectionController';

export const collectionRouter = express.Router();

collectionRouter
  .route('/')
  .get(authentication, getCollections)
  .post(authentication, createCollection)
  .put(authentication, updateCollection);

collectionRouter.route('/:id').delete(authentication, deleteCollection);
