
export function requestError() {
  return async (ctx, next) => {
    try {
      await next();
    }
    catch (e) {
      if (e.status) {
        ctx.response.status = e.status;
        ctx.body = {
          title: e.title,
          message: e.message,
          status: e.status,
          detail: e.detail
        };
      } else {
        console.error(e);
      }
    }
  };
}

class BaseError extends Error {
  title: string;
  status: number;
  message: string;
  detail: string;
}

export class BadRequestAlertException extends BaseError {
  constructor(message?: string, detail?: any) {
    const title = 'Bad Request';
    super(title);
    this.title = title;
    this.status = 400;
    this.message = message || 'Bad Request';
    this.detail = detail;
  }
}

export class UnauthorizedAlertException extends BaseError {
  constructor(message?: string, detail?: any) {
    const title = 'Unauthorized';
    super(title);
    this.title = title;
    this.status = 401;
    this.message = message || 'Unauthorized';
    this.detail = detail;
  }
}

export class NotFoundAlertException extends BaseError {
  constructor(message?: string, detail?: any) {
    const title = 'Not Found';
    super(title);
    this.title = title;
    this.status = 404;
    this.message = message || 'Not Found';
    this.detail = detail;
  }
}
