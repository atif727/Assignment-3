import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { carRoutes } from './app/modules/cars/cars.routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { bookingRoutes } from './app/modules/bookings/bookings.routes';
import { userRoutes } from './app/modules/users/user.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// kept them here because it was only a few routes
app.use("/api/auth", userRoutes)
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

const home = (req: Request, res: Response) => {
  res.send('erm hii..');
};

app.get('/', home);
app.use(globalErrorHandler)

// used this because i was facing some problems with app.use(notFound route)
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'not found',
  });
});

export default app;
