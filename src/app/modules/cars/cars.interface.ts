import { Date, Types } from 'mongoose';

export interface Xcars {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
}

export type Cars = {
  carId: Types.ObjectId;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: 'available' | 'unavailable';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
