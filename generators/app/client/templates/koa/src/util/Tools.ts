import {Context} from 'koa';
import { BadRequestAlertException } from '../middleware/RequestError';

export function getElasticSearchParams(context: Context) {
  const page = context.request.query.page || 0;
  const size = context.request.query.size || 10;
  return {
    query: context.request.query.query,
    page: page * size,
    size,
    sort: context.request.query.sort
  }
}

export function setElasticSearchPagingHeader(context: Context, res: any) {
  context.response.set('X-Total-Count', res.count);
  context.response.set('X-Page', context.request.query.page);
  context.response.set('X-Size', res.size);
}

export function deleteSuccessfulResponse(context: Context, id?: any) {
  context.body = {
    id
  };
}

export function getRequestParamId(context: Context) {
  if (!context.params.id) {
    throw new BadRequestAlertException('Can\'t find the id');
  }
  return context.params.id;
}
