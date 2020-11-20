import express from 'express'
import bodyParser from 'body-parser';
import cookieSession from  'cookie-session';
import router from  './src/utils/decorator';
import  './src/config/ts-sequelize';
import  './src/app/controller/index';



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cookieSession({
      name: 'session',
      keys: ['aiwa-cli'],
      maxAge: 24 * 60 * 60 * 1000
    })
  );
app.use(router);

app.listen(520, () => {
  console.log('server is running');
});
