import { controller, get, post } from "../../utils/decorator";
import { Request, Response } from "express";
import { getResponseData, ResultCode } from "../../utils/utils";
import UserService from "../service/UserSerive";
interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller
export default class UserController {
  @get("/user/:id")
  async userInfo(req: BodyRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const userInfo = await UserService.queryUserById(id);
      res.json(getResponseData(userInfo));
    } catch (error) {
      res.json(getResponseData("", "request error", ResultCode.ERROR_CODE));
      console.log(error);
    }
  }
  @get("/")
  getHome(req: BodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : false;
    console.log(isLogin);

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
          getResponseData("", "账号或密码错误", ResultCode.UNAUTHORIZED_CODE)
        );
      }
    }
  }
  @get("/logout")
  logout(req: BodyRequest, res: Response) {
    if (req.session) {
      req.session = null;
    }
    res.json(getResponseData("退出登录"));
  }
}
