import express from "express";
import userRouter from "./userRouter";
import { notFound } from "../middlewares/handleError";
import checkToken from "../middlewares/authMiddleware.js";

const router = express.Router();

const initRoutes = (app) => {
  app.use("/api/auth", userRouter);

  app.use(checkToken);

  app.use("/api", userRouter);

  app.use("/", (req, res) => {
    res.send("Home page");
  });
  app.use(notFound);
};
export default initRoutes;
