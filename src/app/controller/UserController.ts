import { controller, get, post, use,put } from "../../utils/decorator";
import { Request, Response } from "express";
import {getResponseData, ResultCode, ResultErrorMsg, ResultSuccessMsg} from "../../utils/utils";
import UserService from "../service/UserSerive";
import { validateCookieID } from "../../utils/middleware/validateCookieID";
interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}
@controller
export default class UserController {
  /**
   * 获取用户详情
   * @param req
   * @param res
   */
  @get("/user")
  @use(validateCookieID)
  async userInfo(req: BodyRequest, res: Response) {
    try {
      const uid: string = req.session.login;
      // userService
      try {
        const userInfo = await UserService.queryUserById(parseInt(uid));
        res.json(getResponseData(userInfo));
      } catch (error) {
        res.json(getResponseData(error.message));
      }
    } catch (error) {
      res.json(getResponseData("", ResultErrorMsg.BAD_REQUEST, ResultCode.ERROR_CODE));
      console.log(error);
    }
  }
  @get("/")
  getHome(req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send(`
            <html>
              <body>
                <a href='/getData'>获取内容</a>
                <a href='/showData'>展示内容</a>
                <a href='/api/logout'>退出</a>
              </body>
            </html>
          `);
    } else {
      res.send(`
            <html>
              <body>
                <form method="post" action="/api/login">
                <input type="text" name="userName" />
                  <input type="password" name="password" />
                  <button>登陆</button>
                </form>
              </body>
            </html>
          `);
    }
  }
  @post("/login")
  async login(req: BodyRequest, res: Response) {
    const { userName, password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.json(getResponseData("已经登陆过"));
    } else {
      const user = await UserService.login(userName, password);
      if (user) {
        req.session.login = user.id;
        res.json(getResponseData(user));
      } else {
        res.json(
          getResponseData("", ResultErrorMsg.LOGIN_ERROR, ResultCode.UNAUTHORIZED_CODE)
        );
      }
    }
  }
  @get("/logout")
  @use(validateCookieID)
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session = null;
    }
    res.json(getResponseData("退出登录"));
  }

  @post("/register")
  async register(req: BodyRequest, res: Response) {
    let { userName, password } = req.body;
    try{
      let user = await UserService.register(userName, password);
      if (user) {
        res.json(getResponseData(ResultSuccessMsg.REGISTER_SUCCESS));
      } else {
        res.json(getResponseData('',ResultErrorMsg.REGISTER_ERROR,ResultCode.BAD_REQUEST_CODE));
      }
    }catch (e) {
      res.json(getResponseData('',ResultErrorMsg.PARAMETER_ERROR,ResultCode.ERROR_CODE));
    }

  }
  @put("/user/info")
  @use(validateCookieID)
  async updateUserInfo(req: BodyRequest, res: Response) {
    const uid: string = req.session.login;
    let { skill, address,website,company,occupation,school,education,profile,share } = req.body;
    let flag = await UserService.updateUserInfo(parseInt(uid),skill, address,website,company,occupation,school,education,profile,Boolean(share) )
    if(flag){
      res.json(getResponseData("更新成功"));
    } else{
      res.json(getResponseData('',"更新失败",ResultCode.BAD_REQUEST_CODE));
    }
  }
  @put("/user")
  @use(validateCookieID)
  async updateUser(req: BodyRequest, res: Response) {
    const uid: string = req.session.login;
    let { phone, email,password,nickname } = req.body;
    try{
      let flag = await UserService.updateUser(parseInt(uid), {phone, email, password,nickname})
      if(flag){
        res.json(getResponseData("更新成功"));
      } else{
        res.json(getResponseData('',"更新失败",ResultCode.BAD_REQUEST_CODE));
      }
    }catch (e) {
      res.json(getResponseData('',ResultErrorMsg.PARAMETER_ERROR,ResultCode.BAD_REQUEST_CODE));
    }
  }
}
