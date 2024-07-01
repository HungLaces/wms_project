import db from "../models";
import { Op } from "sequelize";
export const getDevices = ({ page, limit, order, name, code, ...query }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page < 1 ? 0 : page - 1;
      queries.offset = offset * limit;
      queries.limit = limit;
      if (order) queries.order = [order];
      if (name) query.deviceName = { [Op.substring]: name }; // where: { name: { [Op.substring]: `${name}` } }
      if (code) query.deviceCode = { [Op.substring]: code };
      // const devices = await db.Device.findAll({
      const devices = await db.Device.findAllandCountAll({
        where: query,
        ...queries,
      });
      resolve({
        err: devices ? 0 : 1,
        message: devices ? "Getting devices successfully" : "Devices not found",
        deviceData: devices,
      });
    } catch (error) {
      reject(error);
    }
  });
};
