import express from "express";
import cors from "cors";
import restaurants from "./api/temp.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res)=>res.status(404).json({error:"Not -- fount"}));

export default app;