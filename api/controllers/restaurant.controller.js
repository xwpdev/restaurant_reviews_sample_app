import RestaurantDTO from "../../dto/restaurantDTO.js";

export default class RestaurantController {
  /**
   * Get restaurants endpoint
   */
  static async getRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};

    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantsList, totalItems } = await RestaurantDTO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
    });

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalItems,
    };

    res.json(response);
  }
}
