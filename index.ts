import express from 'express'
import bodyParser from 'body-parser';
import cookieSession from  'cookie-session';
import cors from  'cors';
import router from  './src/utils/decorator';
import  './src/config/ts-sequelize';
import  './src/app/controller/index';


const app = express()
app.use(cors());
// app.use(cors({
//     origin:['http://localhost:8080'],//允许该域名下的请求
//     methods:["GET","POST"],　　　　　　//　　允许接受的 请求类型
//     alloweHeaders:['Content-Type','Authorization','Accept','Origin'],　　//请求头
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     credentials: true, // 发送cookie
// }));
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(async function(err, req, res, next) {
    // logic
    try{
        await next()
    }catch(err){
        console.error(err)
        res.json({})
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cookieSession({
      name: 'session',
      keys: ['aiwa-cli'],
      maxAge: 24 * 60 * 60 * 1000
    })
  );
app.use('/api',router);

app.listen(520, () => {
  console.log('server is running');
});
