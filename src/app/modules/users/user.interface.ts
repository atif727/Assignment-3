import { ObjectId, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface xUserInterface {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
}
// type for showing user details with _id and not with password
// this was needed
export type publicUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone: string;
  address: string;
};

export interface UserInterface {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export type XUserRole = keyof typeof USER_ROLE;
