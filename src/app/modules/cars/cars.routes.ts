import express from "express";
import { carsController } from "./cars.controller";

const router = express.Router();

router.get("/", carsController.getAllOrQueryCars);
router.post("/", carsController.createCar);
router.get("/:_id", carsController.findCarById);

export const carRoutes = router;