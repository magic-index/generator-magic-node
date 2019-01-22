import {Context} from "koa";
import { setRoute } from '../middleware/Routes';

/**
 * Loads all posts from the database.
 */

export default class EurekaAction {

  @setRoute('/health')
  async userGetAllAction(context: Context, decoded?: any) {
    context.body = {
      status: 'UP'
    };
  }
}

