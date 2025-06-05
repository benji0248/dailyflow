import express from 'express';
import usersRouter from './features/users/usersRoutes';
import foodRouter from './features/foods/foodRoutes';
import foodScheduleRouter from './features/foodSchedule/foodScheduleRoutes';
import cleanScheduleRouter from './features/cleanSchedule/cleanScheduleRoutes';

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/foods', foodRouter);
app.use('/api/food-schedules', foodScheduleRouter);
app.use('/api/clean-schedules', cleanScheduleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});