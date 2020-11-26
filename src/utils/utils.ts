import { Request } from "express";
import * as QueryString from "querystring";
export const enum ResultCode {
  SUCESS_CODE = 0,
  BAD_REQUEST_CODE = 10000,
  UNAUTHORIZED_CODE = 10001,
  FORBIDDEN_CODE = 10003,
  ERROR_CODE = 10004,
}
export const enum ResultErrorMsg {
  ERROR_BAD_REQUEST = "request error",
  BAD_REQUEST_CODE = 10000,
  UNAUTHORIZED_CODE = 10001,
  FORBIDDEN_CODE = 10003,
  ERROR_CODE = 10004,
}
interface Result {
  code: number;
  msg: string;
  data: any;
}
// QueryString.ParsedQs
export interface IPageBodyRequest extends Request{
    query:{
      page:string,
      pageSize:string,
      type?:string,
      read?:string
    }

}
export interface IPage<T> {
  page: number;
  pageSize: number;
  list: T;
  total: number;
}
export interface IPageCount<T> {
  rows: T[];
  count: number;
}
export const getResponseData = (
  data: any,
  msg: string = "sucess",
  code: number = ResultCode.SUCESS_CODE
): Result => {
  if (msg) {
    return {
      code,
      msg,
      data,
    };
  }
  return {
    code,
    msg,
    data,
  };
};
export const pageResult = (
  page: number,
  pageSize: number,
  total: number,
  list: any
): IPage<any> => {
  return {
    page,
    pageSize,
    total,
    list,
  };
};
