import { Schema, model } from "mongoose";
import { cars } from "./cars.interface";

const carSchema = new Schema<cars>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isElectric: {
    type: Boolean,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
});

export const car = model<cars>("car", carSchema)