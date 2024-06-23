# Public live link of this server

> # SERVER LINK
>
>
>
> > > > > > > https://assignment3-eta-ecru.vercel.app

## This is a server for a shop that gives car for rent

> **IT HAS PRODUCTS OF CARS THAT ARE GIVEN RENT TO USERS ONLY**

---

# How to run the server?

> **There are total 11 methods and functionalities.**

## 1. Signup || Using `POST` method:

* use `< serverlink >/api/auth/signup` and use **PostMan** or any other calling software while maintaining the required user model/structure in [User Signup Model](https://github.com/atif727/idkman/blob/main/authenticationModel.txt) to signup

## 2. Signin || Using `POST` method:

* use `< serverlink >/api/auth/signin` and use **PostMan** or any other calling software while maintaining the required user model/structure in [User Signin Model](https://github.com/atif727/idkman/blob/main/authenticationModel.txt) to signin

## 3. Creating a new Car || Using `POST` method:

* use `< serverlink >/api/cars` and use **PostMan** or any other calling software while maintaining the required Car model/structure in [Car Model](https://github.com/atif727/idkman/blob/main/creatingCarModel.txt) to create a Car in the database
* User needs to have the `admin` role

## 4. Getting All car || Using `GET` method:

- use `< serverlink >/api/cars` and use **PostMan** or any other calling software to get all the cars in the database.

## 5. Retrieve a Specific car by ID || Using `GET` method:

- use `< serverlink >/api/cars/:carId` and use **PostMan** or any other calling software to get a specific car using `_id` of a car from the database.
- do remember to use the `_id`

## 6. Update Car Information || Using `PUT` method:

- use `< serverlink >/api/cars/:carId` and use **PostMan** or any other calling software to update a car in the database.
- do remember to follow to use the fields present in the Car model/structure from [Car Model](https://github.com/atif727/idkman/blob/main/creatingCarModel.txt) while updating the Car.
- do remember to use the `_id`.
- User needs to have the `admin` role.

## 7. Delete Car (SOFT DELETE) || Using `DELETE` method:

- use `< serverlink >/api/cars/:carId` and use **PostMan** or any other calling software to delete a Car in the database.
- do remember to use the `_id`.
- User needs to have the `admin` role.

## 8. Book a car || Using `POST` method:

- use `< serverlink >/api/bookings` and use **PostMan** or any other calling software to while maintaining the required booking model/structure in [booking model](https://github.com/atif727/idkman/blob/main/bookingModel.txt) to create a booking in the database.
- User needs to have the `user` role.

## 9. Retrieve All Bookings (can use query parameters) || Using `GET` method:

- use `< serverlink >/api/bookings` or `< serverlink >/api/bookings?car._id=66783300b4d1964eb594786a&date=2024-12-15` and use **PostMan** or any other calling software to get all/specific bookings from the database.
- User needs to have the `admin` role.
- Make sure you use the given searchable fields from [booking Searchable fields](https://github.com/atif727/idkman/edit/main/bookingSearchableFields.txt)

## 10. Retrieve bookings of User || Using `GET` methods:

- use `< serverlink >/api/bookings/my-bookings` and use **PostMan** or any other calling software to get the bookings of the user in the database.
- User needs to have the `user` role.

## 11. Return a car || Using `PUT` method:

- use `< serverlink >/api/cars/return` and use **PostMan** or any other calling software to while maintaining the required return model/structure in [return model](https://github.com/atif727/idkman/blob/main/returnBooking.txt) to return a booking in the database.
- User needs to have the `admin` role.