import myQueryBuilder from '../../builder/QueryBuilder';
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
  const result = await carModel.findById(_id);
  return result;
};

const updateCarById = async (_id: string, payload: Partial<Cars>) => {
  const result = await carModel.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};


export const carServices = {
  getAllOrQueryCarsFromDB,
  createCarInDB,
  getCarById,
  updateCarById,
};
