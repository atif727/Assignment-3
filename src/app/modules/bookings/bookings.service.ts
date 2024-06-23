import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import subtractTimes from '../../utils/TimeParser';
import { carModel } from '../cars/cars.model';
import { publicUser } from '../users/user.interface';
import { userModel } from '../users/user.model';
import { bookedInterface } from './bookings.interface';
import { bookedModel } from './bookings.model';

const getAllBookingsInDB = async () => {
  // getting all the bookings in database
  const result = await bookedModel.find();
  if (result.length === 0 || result === null || result === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Booking Found');
  } else {
    return result;
  }
};

const bookingACarInDB = async (
  carId: string,
  date: string,
  startTime: string,
  email: string
) => {
  const TheCar = await carModel.findById(carId);
  // kept a function outside which would give an error response for having null
  if (TheCar === null || TheCar === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Car Found');
  } //  checking if the car is unavailable or deleted
  else if (TheCar.status === 'unavailable') {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is unavailable');
  } else if (TheCar.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'Car is deleted');
  } else {
    // seaching up the user using logged in user's email
    const searchedUser = await userModel.findOne({ email: email });
    // seeing if the user exists (for instance)
    if (searchedUser === null || searchedUser === undefined) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    } else {
      // excluding unnecessary fields like createdAt and others
      const user: publicUser = {
        _id: searchedUser._id,
        name: searchedUser.name,
        email: searchedUser.email,
        role: searchedUser.role,
        phone: searchedUser.phone,
        address: searchedUser.address,
      };

      // updating the car's status
      const TheStatusUpdatedCar = await carModel.findByIdAndUpdate(
        carId,
        { status: 'unavailable' },
        { new: true }
      );
      // double checking because it was needed
      // had to do this to stop it from getting error
      if (TheStatusUpdatedCar === null) {
        throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
      } else {
        // partial {}
        const bookingData: Partial<bookedInterface> = {};
        // entering data
        bookingData.user = user;
        bookingData.car = TheStatusUpdatedCar;
        bookingData.date = date;
        bookingData.startTime = startTime;
        bookingData.totalCost = 0;
        // booking success
        const result = (await bookedModel.create(bookingData)).populate('user');
        return result;
      }
    }
  }
};

const gettingMyBookings = async (email: string) => {
  // finding the booking using user's email
  const TheBooking = await bookedModel.findOne({ 'user.email': email });
  if (TheBooking === null || TheBooking === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No booking Found');
  } else {
    return TheBooking;
  }
};

// returning car handler of admin
const returnCar = async (bookingId: string, endTime: string) => {
  // finding the booking using it's id
  const TheBooking = await bookedModel.findById(bookingId);
  if (TheBooking === null || TheBooking === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'No booking Found');
  } else {
    // taking the datas and then updating car status upon returning car
    const startTime = TheBooking.startTime;
    const { pricePerHour, _id } = TheBooking.car;
    // using TimeParser utility substractng the times and getting the duration in hours
    const duration = subtractTimes(startTime, endTime);
    // multiplying the cost with the duration and getting the real cost
    const cost = duration * pricePerHour;
    // updating the car
    const newCar = await carModel.findByIdAndUpdate(
      _id,
      { status: 'available' },
      { new: true }
    );
    // updating the booking data
    const booking = await bookedModel.findByIdAndUpdate(
      bookingId,
      { endTime: endTime, totalCost: cost, car: newCar },
      { new: true }
    );
    return booking;
  }
};

export const bookingServices = {
  getAllBookingsInDB,
  bookingACarInDB,
  gettingMyBookings,
  returnCar,
};
