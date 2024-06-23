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
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  } else {
    return result;
  }
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

const getCarById = async (carId: string) => {
  // getting car by only carId
  const result = await carModel.find({ carId });
  if (result === null || result === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Car Found');
  } else {
    return result;
  }
};

const updateCarById = async (carId: string, payload: Partial<Cars>) => {
  // updating car using _id and given information
  const result = await carModel.findByIdAndUpdate({ carId }, payload, {
    new: true,
  });
  if (result === null || result === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Car Found');
  } else {
    return result;
  }
};

// soft delete
const deleteCarByIdInDB = async (carId: string) => {
  // instead of deleting the car from the database we changed the isDeleted status to true
  const result = await carModel.findByIdAndUpdate(
    { carId },
    { isDeleted: true },
    { new: true }
  );
  if (result === null || result === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Car Found');
  } else {
    return result;
  }
};

export const carServices = {
  getAllOrQueryCarsFromDB,
  createCarInDB,
  getCarById,
  updateCarById,
  deleteCarByIdInDB,
};
