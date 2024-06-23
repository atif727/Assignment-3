# Public live link of this server
<<<<<<< HEAD
> [SERVER LINK](https://assignment3-eta-ecru.vercel.app/)
=======
> [Server](https://assignment3-eta-ecru.vercel.app/)
>>>>>>> f21b37b269e455d6fd7714109015965a48e34630

## This is a server for a shop that gives car for rent
> **IT HAS PRODUCTS OF BASICALLY KEYBOARDS ONLY**
---
# How to run the server?

# **There are total 11 methods and functionalities.**

## 1. Signup || Using `POST` method:
    * use `< serverlink >/api/auth/signup` and use **PostMan** or any other calling software while maintaining the required user model/structure in [User Signup Model]() to signup

## 2. Signin || Using `POST` method:
    * use `< serverlink >/api/auth/signin` and use **PostMan** or any other calling software while maintaining the required user model/structure in [User Signin Model]() to signin

## 3. Creating a new Car || Using `POST` method:
   * use `< serverlink >/api/cars` and use **PostMan** or any other calling software while maintaining the required Car model/structure in [Car Model]() to create a Car in the database.
   * User needs to have the `admin` role.

## 4. Getting All car || Using `GET` method:
   * use `< serverlink >/api/cars` and use **PostMan** or any other calling software to get all the cars in the database.
  
## 5. Retrieve a Specific car by ID || Using `GET` method:
   * use `< serverlink >/api/cars/:carId` and use **PostMan** or any other calling software to get a specific product using `_id` of a car from the database.
   * do remember to use the `_id`
  
## 6. Update Car Information || Using `PUT` method:
   * use `< serverlink >/api/cars/:carId` and use **PostMan** or any other calling software to update a product in the database.
   * do remember to follow to use the fields present in the Car model/structure from [Car Model]() while updating the Car.
   * do remember to use the `_id`.
   * User needs to have the `admin` role.
    
## 7. Delete Car (SOFT DELETE) || Using `DELETE` method:
   * use `< serverlink >/api/cars/:carId` and use **PostMan** or any other calling software to delete a Car in the database.
   * do remember to use the `_id`.
   * User needs to have the `admin` role.
  
## 8. Book a car || Using `POST` method:
   * use `< serverlink >/api/bookings` and use **PostMan** or any other calling software to while maintaining the required booking model/structure in [booking model]() to create a booking in the database.

## 9. Retrieve All Orders || Using `GET` method:
   * use `< serverlink >/api/orders` and use **PostMan** or any other calling software to get all the orders performed in the database.

## 9. Retrieve Orders by User Email || Using `GET` methods:
   * use `< serverlink >/api/orders?email=`  and use **PostMan** or any other calling software to get specific orders according to the email in the database.