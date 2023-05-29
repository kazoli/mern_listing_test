import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { userRouter } from './routes/userRoutes';
import { collectionRouter } from './routes/collectionRoutes';
import { taskRouter } from './routes/taskRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();
const port = process.env.PORT || 5000;

// call DB connection
connectDB();

const app = express();

// parse cookies
app.use(cookieParser());

// parse query
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router part
app.use('/api/users', userRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/tasks', taskRouter);

// serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')),
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production first!'));
}

// call error handler from middlewares
app.use(errorHandler);

// port to which backend is listening to handle requests
app.listen(port, () => console.log(`Server started on port ${port}`)).on('error', console.error);
