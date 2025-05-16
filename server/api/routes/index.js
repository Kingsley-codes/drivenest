import express from "express";
import authRoute from "./authRoute.js";


const router = express.Router();

// Define your routes here
router.use("/auth", authRoute);


export default router;