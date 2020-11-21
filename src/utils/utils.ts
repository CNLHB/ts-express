 
export const enum ResultCode{
  SUCESS_CODE = 0,
  BAD_REQUEST_CODE = 10000,
  UNAUTHORIZED_CODE = 10001,
  FORBIDDEN_CODE = 10003,
  ERROR_CODE = 10004,

}

interface Result {
    code:number;
    msg: string;
    data: any;
}

  
  export const getResponseData = (data: any, msg: string="sucess",code:number=ResultCode.SUCESS_CODE): Result => {
    if (msg) {
      return {
        code,
        msg,
        data
      };
    }
    return {
      code,
      msg,
      data
    };
  };
  