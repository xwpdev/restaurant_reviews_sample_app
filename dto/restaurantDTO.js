let restaurants;

export default class RestaurantDTO {
  /**
   * Initialize DB Connection
   */
  static async injectDB(connection) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await connection
        .db(process.env.NS)
        .collection("restaurants");
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get all restaurants data
   */
  static async getRestaurants({
    filters,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (error) {
      console.error(error);
      return { restaurantsList: [], totalItems: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalItems =
        page === 0 ? await restaurants.countDocuments(query) : 0;

      return { restaurantsList: restaurantsList, totalItems: totalItems };
    } catch (error) {
      console.error(error);
      return { restaurantsList: [], totalItems: 0 };
    }
  }
}
