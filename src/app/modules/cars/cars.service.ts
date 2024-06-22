import httpStatus from 'http-status';
import myQueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { carSearchAbleFields } from './cars.constant';
import { Cars, Xcars } from './cars.interface';
import { carModel } from './cars.model';

// made it get all cars or get cars through query params
const getAllOrQueryCarsFromDB = async (query: Record<string, unknown>) => {
  const carQuery = new myQueryBuilder(carModel.find(), query)
    .search(carSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;
};

const createCarInDB = async (car: Xcars) => {
  // destructered all requested fields and created response to have time fields
  const { color, description, features, isElectric, name, pricePerHour } = car;

  const carData: Partial<Cars> = {};
  carData.name = name;
  carData.color = color;
  carData.description = description;
  carData.features = features;
  carData.isElectric = isElectric;
  carData.pricePerHour = pricePerHour;
  carData.status = 'available';
  carData.isDeleted = false;

  const result = await carModel.create(carData);
  return result;
};

const getCarById = async (_id: string) => {
  // getting car by only _id
  const result = await carModel.findById(_id);
  return result;
};

const updateCarById = async (_id: string, payload: Partial<Cars>) => {
  // updating car using _id and given information
  const result = await carModel.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

// soft delete
const deleteCarByIdInDB = async (_id: string) => {
  // instead of deleting the car from the database we changed the isDeleted status to true
  const result = await carModel.findByIdAndUpdate(
    { _id },
    { isDeleted: true },
    { new: true }
  );
  if (result === null) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return result;
};

export const carServices = {
  getAllOrQueryCarsFromDB,
  createCarInDB,
  getCarById,
  updateCarById,
  deleteCarByIdInDB,
};
