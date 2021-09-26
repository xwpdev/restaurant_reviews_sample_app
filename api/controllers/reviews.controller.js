import ReviewsDTO from "../../dto/reviewsDTO.js";

export default class ReviewsController {
  /**
   * POST review endpoint
   */
  static async postReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };

      const date = new Date();

      const reviewResponse = await ReviewsDTO.addReview(
        restaurantId,
        review,
        userInfo,
        date
      );
      res.status(200).json({ reviewResponse });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async putReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const userId = req.body.user_id;

      const date = new Date();

      const reviewResponse = await ReviewsDTO.putReview(
        reviewId,
        text,
        userId,
        date
      );

      const { errror } = reviewResponse;
      if (errror) {
        res.status(400).json(errror);
      }

      if (reviewResponse.modifiedCount === 0) {
          
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
