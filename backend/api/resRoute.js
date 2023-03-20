import express from "express";
import resController from "./resController.js";
import reviewCtrl from "./reviewController.js";

const router = express.Router();

router.route("/").get(resController.apiGetRestaurants);

router.route("/review")
    .post(reviewCtrl.apiAddReview)
    .put(reviewCtrl.apiUpdateReview)
    .delete(reviewCtrl.apiDeleteReview)

export default router;