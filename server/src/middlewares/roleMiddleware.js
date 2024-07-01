import { forbidden } from "./handleError";

const checkRole = (roleCodes = []) => {
  if (typeof roleCodes === "string") {
    roleCodes = [roleCodes];
  }

  return (req, res, next) => {
    if (roleCodes.length && !roleCodes.includes(req.userData.roleCode)) {
      return forbidden("Forbidden", res);
    }
    next();
  };
};
export default checkRole;
