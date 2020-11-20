import { controller, get, post } from "../../utils/decorator";
import { Request, Response } from "express";
import {getResponseData, ResultCode} from "../../utils/utils";
import Users from "../models/Users";
import UserInfo from './../models/UserInfo';
import UserService from "../service/UserSerive";
interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller
export default class UserController {
  @get("/user/:id")
  async userInfo(req: BodyRequest, res: Response) {
    try {
      const id =  parseInt(req.params.id)
      const userInfo =await UserService.queryUserById(id);
      res.json(getResponseData(userInfo));
    } catch (error) {
      res.json(getResponseData("","request error",ResultCode.ERROR_CODE));
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
                <a href='/logout'>退出</a>
              </body>
            </html>
          `);
    } else {
      res.send(`
            <html>
              <body>
                <form method="post" action="/login">
                  <input type="password" name="password" />
                  <button>登陆</button>
                </form>
              </body>
            </html>
          `);
    }
  }
  @post("/login")
  login(req: BodyRequest, res: Response) {
    const { password } = req.body;
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send("已经登陆过");
    } else {
      if (password === "123" && req.session) {
        req.session.login = true;
        res.send("登陆成功");
      } else {
        res.send("登陆失败");
      }
    }
  }
  @get("/logout")
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.redirect("/");
  }

}
  
//

