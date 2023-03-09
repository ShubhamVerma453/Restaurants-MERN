import express from "express";

const router = express.Router();

router.route("/").get((req, res) =>  {
    console.log("ok");
    res.send("hello")
} )

export default router;