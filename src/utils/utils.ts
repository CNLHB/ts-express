 
export const enum ResultCode{
  SUCESS_CODE = 0

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
  