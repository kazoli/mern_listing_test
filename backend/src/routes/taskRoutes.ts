import express from 'express';
import { userAuthentication } from '../middlewares/userMiddleware';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

export const taskRouter = express.Router();

taskRouter.route('/:collection_id').get(userAuthentication, getTasks);

taskRouter.route('/').post(userAuthentication, createTask).put(userAuthentication, updateTask);

// :id is task ID
taskRouter.route('/:id').delete(userAuthentication, deleteTask);
