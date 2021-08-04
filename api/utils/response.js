const config = require('./config');

class GeneralResponse { 
    constructor(message,result,statusCode = "") { 
        this.message = message;
        this.statusCode = statusCode == "" ? config.HTTP_SUCCESS : statusCode;
        this.result = result;
    }
}

module.exports = {
    GeneralResponse,
}