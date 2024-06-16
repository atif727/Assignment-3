import { Date, ObjectId } from 'mongoose';

export interface Xcars {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
}

export interface Cars {
  _id: ObjectId
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
}
