import * as userServices from "../services";
import { internalServerError, badRequest } from "../middlewares/handleError";
// import { rdCode, password } from "../helper/joi_schema";
//import joi from "joi";
const register = async (req, res) => {
  try {
    const { rdCode, password } = req.body;

    if (!rdCode || !password) {
      return res.status(400).json({
        err: 1,
        message: "Missing rdCode or password",
      });
    }
    const result = await userServices.register(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return internalServerError(res);
  }
};
const login = async (req, res) => {
  try {
    const { rdCode, password } = req.body;
    if (!rdCode || !password) {
      return res.status(400).json({
        err: 1,
        message: "Missing rdCode or password",
      });
    }
    const result = await userServices.login(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return internalServerError(res);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const result = await userServices.getUser(req.userData.id);
    return res.status(200).json(result);
  } catch (error) {
    return internalServerError(res);
  }
};

export default {
  login,
  register,
  getCurrentUser,
};
