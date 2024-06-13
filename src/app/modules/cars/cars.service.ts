import myQueryBuilder from "../../builder/QueryBuilder";
import { carSearchAbleFields } from "./cars.constant";
import { car } from "./cars.model";

// made it get all cars or get cars through query params
const getAllOrQueryCarsFromDB = async (query: Record<string, unknown>) => {
  const carQuery = new myQueryBuilder(car.find(), query)
    .search(carSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await carQuery.modelQuery;
  return result;
};

export const carServices = {
  getAllOrQueryCarsFromDB,
};
