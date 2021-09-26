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
  static async addReview(restaurantId, text, user, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: text,
        restaurant_id: ObjectId(restaurantId),
      };

      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  /**
   * Update review
   */
  static async putReview(reviewId, text, userId, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          user_id: userId,
          _id: ObjectId(reviewId),
        },
        {
          $set: { text: text, date: date },
        }
      );

      return updateResponse;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }

  /**
   * Delete review
   */
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        user_id: userId,
        _id: ObjectId(reviewId),
      });

      return deleteResponse;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
}
