import express from "express";
import resController from "./resController.js";

const router = express.Router();

router.route("/").get(resController.apiGetRestaurants);

export default router;