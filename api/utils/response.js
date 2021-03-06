import { config } from './config.js';

export class GeneralResponse {
    constructor(message,result,statusCode = '') {
        this.message = message;
        if(statusCode === ''){
            this.statusCode = config.HTTP_SUCCESS;
        } else{
            this.statusCode = statusCode;
        }
        this.result = result;
    }
}
