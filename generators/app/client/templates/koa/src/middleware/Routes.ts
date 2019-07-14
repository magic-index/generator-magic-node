import * as Router from "koa-router";
import Cache from '../util/Cache';
import {Context} from 'koa';
import * as jwt from 'jsonwebtoken';
import {JhiUser} from "../entity/JhiUser";
import RouterSecurityConfiguration, {RouterSecurityType} from './../config/RouterSecurityConfiguration'
import {PermissionDeniedAlertException, UnauthorizedAlertException} from "./RequestError";

export enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export enum AuthorityCode {
  ALL = '*',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

let routerSecurityPathList = []
routerSecurityPathList = Object.keys(RouterSecurityConfiguration).sort((a, b) => {
  return b.length - a.length
})

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
    for (let i = 0; i < routerSecurityPathList.length; i++) {
      if (route.path.indexOf(routerSecurityPathList[i]) > -1) {
        route.security = RouterSecurityConfiguration[routerSecurityPathList[i]];
        break
      }
    }
    if (route.security == null) {
      route.security = RouterSecurityType.REJECT
    }
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
    if (route.security === RouterSecurityType.REJECT) {
      throw new PermissionDeniedAlertException();
    }
    // jwt 解密出来的用户信息
    let decoded: any;
    // 与接口匹配的权限名
    let allowRole: any;
    try {
      let token = context.req.headers.authorization;
      if (token.length > 7) {
        token = token.substr(7);
      }
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, Cache.config.jwtSecret, (error, decoded) => {
          error ? reject(error) : resolve(decoded);
        });
      });
    } catch (e) {
    }
    // 获取与接口相匹配的授权
    if (decoded != null && route.authorities != null) {
      for (let i = 0; i < route.authorities.length; i++) {
        if ((decoded.authorities || []).includes(route.authorities[i])) {
          allowRole = route.authorities[i];
          break
        }
      }
    }
    if (decoded != null) {
      decoded.allowRole = allowRole;
    }
    switch (route.security) {
      case RouterSecurityType.PERMIT:
        await this.action(route, context, decoded);
        break;
      case RouterSecurityType.AUTHENTICATED:
        if (decoded == null) {
          throw new UnauthorizedAlertException();
        } else if (route.authorities != null && route.authorities.length > 0 && allowRole == null) {
          throw new PermissionDeniedAlertException();
        }
        await this.action(route, context, decoded);
        break;
      default:
        throw new PermissionDeniedAlertException();
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
  authorities?: Array<AuthorityCode> | string;
  action: (context: Context, decoded?: DecodedUserInfo) => {};
  security?: RouterSecurityType
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

