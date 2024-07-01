import express from "express";
import { userController } from "../controllers";
import checkRole from "../middlewares/roleMiddleware.js";
const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/user", checkRole(["R1", "R2"]), userController.getCurrentUser);
module.exports = router;
