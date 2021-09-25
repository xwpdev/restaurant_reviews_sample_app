import express from "express";
import RestaurantController from "../controllers/restaurant.controller.js";

const router = express.Router();

router.route("/").get(RestaurantController.apiGetRestaurants);

export default router;
