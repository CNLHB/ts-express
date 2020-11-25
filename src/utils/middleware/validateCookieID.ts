import { Response, Request, NextFunction } from "express";
import { ResultCode, getResponseData } from "../utils";
export const validateCookieID = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let uid = req.session.login;
  if (!uid) {
    res.json(
      getResponseData("", "Please log in", ResultCode.UNAUTHORIZED_CODE)
    );
  } else {
    next();
  }
};
