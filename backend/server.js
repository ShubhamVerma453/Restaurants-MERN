import express from "express";
import cors from "cors";
import resRoute from "./api/resRoute.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants", resRoute);
app.use("*", (req, res)=>res.status(404).json({error:"Not -- fount"}));

export default app;