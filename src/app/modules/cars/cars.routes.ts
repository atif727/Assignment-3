import express from "express";
import { carsController } from "./cars.controller";

const router = express.Router();

router.get("/", carsController.getAllOrQueryCars);
router.post("/", carsController.getAllOrQueryCars);

export const carRoutes = router;