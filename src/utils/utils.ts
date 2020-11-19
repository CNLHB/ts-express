interface Result {
    sucesss: boolean;
    code:number;
    errMsg?: string;
    data: any;
  }
  
  export const getResponseData = (data: any, errMsg?: string,code:number=0): Result => {
    if (errMsg) {
      return {
        sucesss: false,
        code,
        errMsg,
        data
      };
    }
    return {
      sucesss: true,
      code,
      data
    };
  };
  