import { Schema, model } from 'mongoose';
import { UserInterface, publicUser } from './user.interface';

export const UserSchemaModel: Schema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
);
export const PublicUserSchemaModel: Schema = new Schema<publicUser>({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

export const userModel = model<UserInterface>('users', UserSchemaModel);
