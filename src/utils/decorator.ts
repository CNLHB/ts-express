import { Router, RequestHandler } from "express";
import "reflect-metadata";
const router = Router();
const mapRouter: Map<string, RequestHandler> = new Map<
  string,
  RequestHandler
>();
const mapMiddleware: Map<string, RequestHandler> = new Map<
  string,
  RequestHandler
>();
enum Method {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}

export function controller(target: any) {
  for (const [key, value] of mapRouter) {
    const path = Reflect.getMetadata("path", mapRouter, key);
    const method: Method = Reflect.getMetadata("method", mapRouter, key);
    const handler = value;
    // const middleware = Reflect.getMetadata("middleware", mapRouter, key);
    const middleware = mapMiddleware.get(key);
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler);
      } else {
        router[method](path, handler);
      }
    }
  }
  mapRouter.clear();
}

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    // mapRouter.set(key,target.value)
    mapMiddleware.set(key, middleware);
    Reflect.defineMetadata("middleware", middleware, mapMiddleware, key);
  };
}

function getRequestDecorator(type: string) {
  return function (path: string) {
    const newPath = path.startsWith("/") ? path : `/${path}`;
    return function (target: any, key: string, descriptor: any) {
      mapRouter.set(key, descriptor.value);
      Reflect.defineMetadata("path", newPath, mapRouter, key);
      Reflect.defineMetadata("method", type, mapRouter, key);
    };
  };
}

export const get = getRequestDecorator(Method.get);
export const post = getRequestDecorator(Method.post);
export const put = getRequestDecorator(Method.put);
export const del = getRequestDecorator(Method.delete);

export default router;
