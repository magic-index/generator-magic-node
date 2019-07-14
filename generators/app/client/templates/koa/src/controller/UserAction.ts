import {Context} from 'koa';
import {getManager} from 'typeorm';
import {JhiUser} from '../entity/JhiUser';
import * as jwt from 'jsonwebtoken';
import Cache from './../util/Cache';
import {AuthorityCode, RequestMethod, setRoute} from '../middleware/Routes';
import {BadRequestAlertException, UnauthorizedAlertException} from '../middleware/RequestError';
import * as MD5 from 'md5';

/**
 * Loads all posts from the database.
 */

export default class UserAction {
  /**
   * Use the account password to get Token
   * 使用账号获取JWT Token
   * @param {Application.Context} context
   * @param decoded
   * @returns {Promise<void>}
   */
  @setRoute('/api/authenticate', RequestMethod.POST)
  async accountLoginAction(context: Context, decoded?: any) {
    const param = {
      username: context.request.body.username,
      password: context.request.body.password
    };
    if (!param.username || !param.password) {
      throw new BadRequestAlertException('请正确输入账号或密码');
    }

    // get a post repository to perform operations with post
    const userRepository = getManager().getRepository(JhiUser);

    // load a post by a given post id
    let users = await userRepository.find({
      where: {
        login: param.username,
        passwordHash: MD5(param.password)
      },
      relations: ['authorities']
    });

    if (users.length !== 1) {
      throw new UnauthorizedAlertException('账号或密码错误');
    } else {
      delete users[0].passwordHash;
      const user = {...users[0]};
      const authorities = [];
      user.authorities.forEach(item => {
        authorities.push(item.name);
      });
      delete user.authorities;
      const token = jwt.sign({
        user: user,
        authorities
      }, Cache.config.jwtSecret, {
        expiresIn:  1296000 // 1296000 seconds to (15 days). 秒到期时间(15天)
      });
      // user: users[0],
      context.body = {
        id_token: token
      };
    }
  }

  @setRoute('/api/account')
  async getAccount(context: Context, decoded?: any) {
    const userRepository = getManager().getRepository(JhiUser);
    // load a post by a given post id
    let users = await userRepository.find({
      where: {
        id: decoded.user.id
      },
      relations: ['authorities']
    });
    const user = users[0];
    delete user.passwordHash;
    const authorities = [];
    user.authorities.forEach(item => {
      authorities.push(item.name);
    });
    user.authorities = authorities;
    context.body = user;
  }

  @setRoute('/api/user', RequestMethod.GET, [AuthorityCode.ROLE_ADMIN])
  async userGetAllAction(context: Context, decoded?: any) {

    // get a post repository to perform operations with post
    const userRepository = getManager().getRepository(JhiUser);

    // load a post by a given post id
    const users = await userRepository.find();

    // return loaded posts
    context.body = users;
  }
}

