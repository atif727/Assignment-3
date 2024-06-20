import { UserInterface, xUserInterface } from './user.interface';
import { userModel } from './user.model';

const createUserInDB = async (body: xUserInterface) => {
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
  const result = await userModel.find();
  return result;
};
export const userService = {
  createUserInDB,
  getAllUsersFromDB,
};
