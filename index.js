import app from "./server.js";

import mongodb from "mongodb";
import dotenv from "dotenv";

import RestaurantDTO from "./dto/restaurantDTO.js";

/**
 * Environment variables
 */
dotenv.config();

/**
 * Server port
 */
const port = process.env.port || 8000;

/**
 * Configure MongoDB client
 */
const MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch((err) => {
    // If any error occurs while connecting to DB
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    /**
     * Initial Reference to DB collection
     */
    await RestaurantDTO.injectDB(client);

    // On successful DB connect, run the API
    app.listen(port, () => {
      console.log(`Listening to port: ${port}`);
    });
  });
