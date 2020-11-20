import { Router, RequestHandler } from 'express';
import 'reflect-metadata';

const router = Router();
let mapRouter = {}
enum Method {
  get = 'get',
  post = 'post'
}


export function controller(target: any) {
  // console.log(Object.getOwnPropertyNames(target.prototype));

  for (let key in mapRouter) {
    const path = Reflect.getMetadata('path', mapRouter, key);
    const method: Method = Reflect.getMetadata('method', mapRouter, key);
    const handler = mapRouter[key];
    const middleware = Reflect.getMetadata('middleware', mapRouter, key);
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
}

export function use(middleware: RequestHandler) {
  return function(target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key);
  };
}

function getRequestDecorator(type: string) {
 
  return function(path: string) {
    const newPath = path.startsWith("/")?path: `/${path}`
    return function(target: any, key: string,descriptor:any) {
      //descriptor.value
      mapRouter[key] = descriptor.value
      Reflect.defineMetadata('path', newPath, mapRouter, key);
      Reflect.defineMetadata('method', type, mapRouter, key);
    };
  };
}

export const get = getRequestDecorator('get');
export const post = getRequestDecorator('post');
export const put = getRequestDecorator('put');
export const del = getRequestDecorator('delete');
export default router