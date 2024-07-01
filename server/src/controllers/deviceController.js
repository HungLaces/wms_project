import * as deviceService from "../services/deviceService";
import { internalServerError, badRequest } from "../middlewares/handleError";

export const getDevices = async (req, res) => {
  try {
    const result = await deviceService.getDevices(req.query);
    return res.status(200).json(result);
  } catch (error) {
    return internalServerError(res);
  }
};
