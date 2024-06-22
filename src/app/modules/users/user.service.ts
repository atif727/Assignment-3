import { UserInterface, xUserInterface } from './user.interface';
import { userModel } from './user.model';

const createUserInDB = async (body: xUserInterface) => {
  // creating user in database
  const realBody: Partial<UserInterface> = {
    name: body.name,
    email: body.email,
    role: body.role,
    password: body.password,
    phone: body.phone,
    address: body.address,
  };
  const result = await userModel.create(realBody);
  return result;
};

const getAllUsersFromDB = async () => {
  // getting all users in database for dev reasons
  const result = await userModel.find();
  return result;
};

export const userService = {
  createUserInDB,
  getAllUsersFromDB,
};
