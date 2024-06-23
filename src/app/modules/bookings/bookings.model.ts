import { Schema, model } from 'mongoose';
import { bookedInterface } from './bookings.interface';
import { carsSchema } from '../cars/cars.model';
import { PublicUserSchemaModel } from '../users/user.model';


const bookedSchema = new Schema<bookedInterface>(
  {
    date: { type: String, required: true, trim: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    user: PublicUserSchemaModel,
    car: carsSchema,
    totalCost: { type: Number },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
);

export const bookedModel = model<bookedInterface>('booking', bookedSchema);
