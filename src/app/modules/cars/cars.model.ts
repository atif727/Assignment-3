import { Schema, model } from 'mongoose';
import { Cars } from './cars.interface';

export const carsSchema = new Schema<Cars>(
  {
    name: { type: String, required: true, trim: true, maxlength: 10 },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      required: true,
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, versionKey: false } // Automatically add createdAt and updatedAt fields
);

export const carModel = model<Cars>('car', carsSchema);
