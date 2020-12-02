import express from 'express'
import bodyParser from 'body-parser';
import cookieSession from  'cookie-session';
import cors from  'cors';
import router from  './src/utils/decorator';
import  './src/config/ts-sequelize';
import  './src/app/controller/index';
import catchError from "./src/utils/middleware/exception";

const app = express()
// app.use(cors());
app.use((req, res, next) => {
//判断路径
    if(req.path !== '/' && !req.path.includes('.')){
        res.set({
            'Access-Control-Allow-Credentials': true, //允许后端发送cookie
            'Access-Control-Allow-Origin': req.headers.origin || "http://localhost:1010" || '*', //任意域名都可以访问,或者基于我请求头里面的域
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
            'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
        })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})
// app.use(cors({
//     origin:['http://localhost:8080'],//允许该域名下的请求
//     methods:["GET","POST"],　　　　　　//　　允许接受的 请求类型
//     alloweHeaders:['Content-Type','Authorization','Accept','Origin'],　　//请求头
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     credentials: true, // 发送cookie
// }));
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(catchError);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cookieSession({
      name: 'session',
      keys: ['aiwa-cli'],
      maxAge: 24 * 60 * 60 * 1000
    })
  );
app.use(async (req,res, next) => {
    const start = +new Date()
    await next()
    const ms = +new Date() - start
    console.log(`${req.method} ${req.url} - ${ms}ms`)
})

app.use('/api',router);

app.listen(520, () => {
  console.log('server is running');
});
