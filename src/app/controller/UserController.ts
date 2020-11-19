import { controller, get, post } from "../../utils/decorator";
import { Request, Response, NextFunction } from 'express';
import {getResponseData} from '../../utils/utils'

interface BodyRequest extends Request {
    body: { [key: string]: string | undefined };
}

@controller
class UserController{
    @get("/getActive")
    public getActive(req: BodyRequest, res: Response){
        res.json(getResponseData({name:"没有内容"}))
    }
    @get("/")
    public index(req: BodyRequest, res: Response){
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
    @post("login")
    public login(req: BodyRequest, res: Response){
        const { password } = req.body;
        const isLogin = req.session ? req.session.login : false;
        if (isLogin) {
          res.send('已经登陆过');
        } else {
          if (password === '123' && req.session) {
            req.session.login = true;
            res.send('登陆成功');
          } else {
            res.send('登陆失败');
          }
        }
    }
    @get("/logout")
    public logout(req: BodyRequest, res: Response){
        if (req.session) {
            req.session.login = undefined;
          }
          res.redirect('/');
    }
}