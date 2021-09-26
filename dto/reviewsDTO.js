import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDTO {
  static async injectDb(connection) {
    if (reviews) {
      return;
    }
    try {
      reviews = await connection.db(process.env.NS).collection("reviews");
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Add review
   */
  static async addReview(restaurantId, review, userInfo, date) {}

  /**
   * Update review
   */
  static async putReview(reviewId, text, userId, date) {}

  /**
   * Delete review
   */
  static async deleteReview(reviewId, userId) {}
}
