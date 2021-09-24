import mongodb from "mongodb";
import dotenv from "dotenv";

import app from "./server.js";

/**
 * Environment variables
 */
dotenv.config();

/**
 * Server port
 */
const port = process.env.port || 8000;

/**
 * Config MongoDB client
 */
const MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    // If any error occurs while connecting to DB
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    app.listen(port, () => {
      console.log(`Listening to port: ${port}`);
    });
  });
