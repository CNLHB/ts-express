import { Response, Request, NextFunction } from "express";
import { ResultCode, getResponseData } from "../utils";
export const setPageOrPageSize = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let page = req.query.page;
  let pageSize = req.query.pageSize;
  if (!page||!pageSize){
    req.query.page = '1'
    req.query.pageSize='10';
  }
    next();
};
