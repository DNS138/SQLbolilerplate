import { config } from './config.js';

export class GeneralError extends Error {
    constructor(message, result = '', statusCode = '') {
    super();
    this.message = message;
    this.statusCode = statusCode;
    if(result === ''){
      this.result = null;
    } else{
      this.result = result;
    }
  }
  getCode() {
    if (this instanceof BadRequest) {
      return config.HTTP_BAD_REQUEST;
    } else if (this instanceof NotFound) {
      return config.HTTP_NOT_FOUND;
    } else if (this instanceof UnAuthorized) {
      return config.HTTP_UN_AUTHORIZED;
    } else if (this instanceof ServiceNotAvailable) {
      return config.HTTP_SERVICE_NOT_AVAILABLE;
    }else{
      return config.HTTP_SERVER_ERROR;
    }
  }
}
export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}
export class UnAuthorized extends GeneralError {}
export class ServiceNotAvailable extends GeneralError {}

