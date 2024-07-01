import jwt from "jsonwebtoken";
import { notAuthorized } from "./handleError";
export default function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return notAuthorized("Required authorization", res);
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() <= jwtObject.exp * 1000;

    if (!isExpired) {
      return notAuthorized("Token expired", res);
    } else {
      req.userData = jwtObject;
      next();
    }
  } catch (err) {
    return notAuthorized(err.message, res);
  }
}
