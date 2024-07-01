import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (password) =>
  bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
export const register = ({
  rdCode,
  firstName,
  lastName,
  password,
  phoneNumber,
  department,
  roleCode,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        // response return array [user, created ]
        where: {
          rdCode: rdCode,
        },
        defaults: {
          rdCode: rdCode,
          firstName: firstName,
          lastName: lastName,
          password: hashPassword(password),
          phoneNumber: phoneNumber,
          department: department,
          roleCode: roleCode,
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              rdCode: response[0].rdCode,
              roleCode: response[0].roleCode,
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        data: response[1] ? response[0] : "User already exists",
        access_token: token ? `Bearer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ rdCode, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const existingUser = await db.User.findOne({
        where: {
          rdCode: rdCode,
        },
        raw: true,
      });
      const isChecked =
        existingUser && bcrypt.compareSync(password, existingUser.password);
      const token = isChecked
        ? jwt.sign(
            {
              id: existingUser.id,
              rdCode: existingUser.rdCode,
              roleCode: existingUser.roleCode,
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        data: token
          ? "Login successfully"
          : existingUser
          ? "Password incorrect"
          : "Username not found",
        access_token: token ? `Bearer ${token}` : token,
      });
    } catch (error) {
      reject({
        err: 1,
        message: "Invalid username or password",
      });
    }
  });

export const getUser = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Role,
            as: "roleData", // alias for Role model same user model
            attributes: ["roleName"],
          },
        ],
        raw: true,
      });
      resolve({
        err: user ? 0 : 1,
        message: user ? "Getting user successfully" : "User not found",
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
