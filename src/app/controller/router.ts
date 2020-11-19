import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
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
});

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined;
  }
  res.redirect('/');
});

router.post('/login', (req: RequestWithBody, res: Response) => {
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
});





export default router;
