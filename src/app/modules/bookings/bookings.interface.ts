import { Date } from 'mongoose';
import { Cars } from '../cars/cars.interface';

export interface bookingInterface {
  carId: string;
  date: Date;
  startTime: string;
}

export interface bookedInterface {
  date: string;
  startTime: string;
  endTime: string | null;
  car: Cars;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
}
