import express from 'express';
import cors from 'cors';
import usersRouter from './features/users/usersRoutes';
import foodRouter from './features/foods/foodRoutes';
import foodScheduleRouter from './features/foodSchedule/foodScheduleRoutes';
import cleanScheduleRouter from './features/cleanSchedule/cleanScheduleRoutes';
import authRouter from './auth/auth.routes';
import dotenv from 'dotenv';

const app = express();

const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto al origen de tu frontend
  credentials: true,
}));

dotenv.config();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/auth', authRouter)
app.use('/api/foods', foodRouter);
app.use('/api/food-schedules', foodScheduleRouter);
app.use('/api/clean-schedules', cleanScheduleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});