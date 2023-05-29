import express from 'express';
import { authentication } from '../middlewares/userMiddleware';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

export const taskRouter = express.Router();

taskRouter.route('/:collection_id').get(authentication, getTasks);

taskRouter.route('/').post(authentication, createTask).put(authentication, updateTask);

// :id is task ID
taskRouter.route('/:id').delete(authentication, deleteTask);
