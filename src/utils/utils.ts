import { Request } from "express";
/**
 * 接口返回值状态码
 */
export const enum ResultCode {
  SUCCESS_CODE = 0,
  BAD_REQUEST_CODE = 10000,
  UNAUTHORIZED_CODE = 10001,
  FORBIDDEN_CODE = 10003,
  ERROR_CODE = 10004,
}
export const enum ResultErrorMsg {
  BAD_REQUEST = "request error",
  LOGIN_ERROR = "账号或密码错误",
  REGISTER_ERROR = "账号已存在，请重新注册!",
  PARAMETER_ERROR = "参数有误，请重新提交!",
  READ_MESSAGE_ERROR = "消息读取错误!",
}
export const enum ResultSuccessMsg {
  REGISTER_SUCCESS = "账号注册成功!",
  READ_MESSAGE_SUCCESS = "消息读取成功!",
  SEND_MESSAGE_SUCCESS = "消息发送成功!",

}

interface Result {
  code: number;
  msg: string;
  data: any;
}
/**
 * 分页接口
 */
export interface IPageBodyRequest extends Request{
    query:{
      page:string,
      pageSize:string,
      type?:string,
      read?:string,
      q?:string

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
  msg: string = "success",
  code: number = ResultCode.SUCCESS_CODE
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
