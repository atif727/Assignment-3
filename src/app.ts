import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { carRoutes } from './app/modules/cars/cars.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application

app.use('/api/car', carRoutes);
// app.use('/api/orders', orderRoutes);

const home = (req: Request, res: Response) => {
  res.send('erm hii..');
};

app.get('/', home);

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'not found',
  });
});

export default app;
