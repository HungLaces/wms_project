import joi from "joi";

export const rdCode = joi.string().required();
export const password = joi.string().min(6).max(30).required();
