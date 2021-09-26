import express from "express";

import RestaurantController from "../controllers/restaurant.controller.js";
import ReviewsController from "../controllers/reviews.controller.js";

const router = express.Router();

router.route("/").get(RestaurantController.getRestaurants);
router.route("/id/:id").get(RestaurantController.getRestaurantById);
router.route("/cusines").get(RestaurantController.getRestaurantCusines);

router
  .route("/review")
  .post(ReviewsController.postReview)
  .put(ReviewsController.putReview)
  .delete(ReviewsController.deleteReview);

export default router;
