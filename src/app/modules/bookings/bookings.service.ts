import { MULTIPLE_CHOICES } from 'http-status';
import { noDataFound } from '../../errors/noDataFoundError';
import subtractTimes from '../../utils/TimeParser';
import { carModel } from '../cars/cars.model';
import { bookedInterface } from './bookings.interface';
import { bookedModel } from './bookings.model';

const getAllBookingsInDB = async () => {
  const result = await bookedModel.find();
  return result;
};

const bookingACarInDB = async (
  carId: string,
  date: string,
  startTime: string,
) => {
  const TheCar = await carModel.findById(carId);
  if (TheCar === null) {
    return null;
  } else if (TheCar.status === 'unavailable') {
    return 'Car is not available';
  }
  const TheStatusUpdatedCar = await carModel.findByIdAndUpdate(
    carId,
    { status: 'unavailable' },
    { new: true },
  );
  // had to do this to stop it from
  if (TheStatusUpdatedCar === null) {
    return null;
  }
  const bookingData: Partial<bookedInterface> = {};

  bookingData.car = TheStatusUpdatedCar;
  bookingData.date = date;
  bookingData.startTime = startTime;
  bookingData.totalCost = 0;

  const result = await bookedModel.create(bookingData);
  return result;
};

const gettingMyBookings = async () => {};

// returning car handler of admin
const returnCar = async (bookingId: string, endTime: string) => {
  const TheBooking = await bookedModel.findById(bookingId);
  if (TheBooking === null) {
    return null;
  }
  const startTime = TheBooking.startTime;
  const { pricePerHour, _id } = TheBooking.car;
  const duration = subtractTimes(startTime, endTime);
  const cost = duration * pricePerHour;
  const newCar = await carModel.findByIdAndUpdate(
    _id,
    { status: 'available' },
    { new: true },
  );
  const booking = await bookedModel.findByIdAndUpdate(
    bookingId,
    { endTime: endTime, totalCost: cost, car: newCar },
    { new: true },
  );
  return booking;
};

export const bookingServices = {
  getAllBookingsInDB,
  bookingACarInDB,
  gettingMyBookings,
  returnCar,
};
