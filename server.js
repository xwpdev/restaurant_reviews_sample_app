import express from "express";
import cors from "cors";

import restaurants from "./api/routes/restaurants.route.js";

/**
 * New Express app
 */
const app = express();

/**
 * Config Middleware
 */
app.use(cors());
// set server to read body JSON
app.use(express.json());

/**
 * General routes
 */
app.use("/api/v1/restaurants", restaurants);
// Wildcard route
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
