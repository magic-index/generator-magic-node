import * as UserAction from "../controller/UserAction";
import * as Router from "koa-router";
import Cache from '../util/Cache';
import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';
import {JhiUser} from "../entity/JhiUser";

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export enum AuthorityCode {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export class AppRoutes {
  static router = new Router();

  /**
   * 所有已插入的路由
   * @type {Route[]}
   */
  static routes: Array<Route> = [];

  /**
   * 插入一个新路由地址
   * @param {Route} route
   */
  static push(route: Route) {
    this.routes.push(route);
    this.router[route.method](route.path, async (context: Context) => {
      await this.authority(context, route);
    });
  }

  /**
   * 鉴权
   * @param {Application.Context} context
   * @param {Route} route
   * @returns {Promise<void>}
   */
  private static async authority(context: Context, route: Route) {
    if (route.authorities) {
      let token = context.req.headers.authorization;
      if (token.length > 7) {
        token = token.substr(7);
      }
      let decoded: any;
      try {
        decoded = await new Promise((resolve, reject) => {
          jwt.verify(token, Cache.config.jwtSecret, (error, decoded) => {
            error ? reject(error) : resolve(decoded);
          });
        });
      } catch (e) {
        context.status = 401;
        context.body = {
          title: 'Token error',
          msg: token && token !== '' ? '登陆已过期，请重新登录' : '请先登陆'
        };
        return;
      }
      if (route.authorities != null && route.authorities.length > 0) {
        let allowRole = null
        for (let i = 0; i < route.authorities.length; i++) {
          if ((decoded.authorities || []).includes(route.authorities[i])) {
            allowRole = route.authorities[i]
            break
          }
        }
        if (allowRole == null) {
          context.status = 403;
          context.body = {
            title: 'Permission denied',
            msg: '权限不足'
          };
        } else {
          decoded.allowRole = allowRole
          await this.action(route, context, decoded);
        }
      } else {
        await this.action(route, context, decoded);
      }
    } else {
      await this.action(route, context);
    }
  }

  private static async action(route: Route, context: Context, decoded?: DecodedUserInfo) {
    try {
      await route.action(context, decoded);
    } catch (err) {
      console.error(err)
      if (err.status == null || err.title == null) {
        if (err.sql || err.query) {
          context.status = 400;
          const res = {
            ...err,
            sql: 'Shielding for security reasons.',
            query: 'Shielding for security reasons.'
          };
          context.body = res;
        } else {
          context.status = 500;
          context.body = err;
        }
      } else {
        throw err
      }
    }
  }
}

class Route {
  path: string;
  method: RequestMethod;
  authorities?: Array<AuthorityCode>;
  action: (context: Context, decoded?: DecodedUserInfo) => {};
}

export class DecodedUserInfo {
  user: JhiUser;
  authorities: Array<String>;
  allowRole: String;
}

/**
 * action 设置路由的注解方法
 * @param {string} path
 * @param {RequestMethod} method
 * @param {AuthorityCode} authority
 * @returns {(target, propertyKey: string, descriptor: PropertyDescriptor) => void}
 */
export function setRoute(path: string, method: RequestMethod = RequestMethod.GET, authorities?: Array<AuthorityCode>) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    AppRoutes.push({
      path,
      method: method || RequestMethod.GET,
      authorities,
      action: descriptor.value
    });
  }
}

