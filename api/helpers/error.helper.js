const { GeneralError, BadRequest } = require('../utils/error');
const config = require('../utils/config');

const handleErr = function handleErrors(err, req, res) {
  if (err instanceof GeneralError && err.statusCode !== '') {
    if(err.result !== ''){
      return res.status(err.statusCode).json({
        status: config.ERROR,
        code: err.statusCode,
        message: err.message,
        result: err.result
      });
    }else {
      return res.status(err.statusCode).json({
        status: config.ERROR,
        code: err.statusCode,
        message: err.message,
        result: undefined
      });
    }
   } else if (err instanceof GeneralError && err.statusCode === '') {
     if(err.result !== ''){
      return res.status(err.statusCode).json({
        status: config.ERROR,
        code: err.getCode(),
        message: err.message,
        result: err.result
      });
     }else{
      return res.status(err.getCode()).json({
        status: config.ERROR,
        code: err.getCode(),
        message: err.message,
        result: undefined
      });
     }
  }else{
    if(err.statusCode !== ''){
      return res.status(config.HTTP_SERVER_ERROR).json({
        status: config.ERROR,
        code: err.statusCode,
        message: err.message
      });
    }else{
      return res.status(config.HTTP_SERVER_ERROR).json({
        status: config.ERROR,
        code: config.HTTP_SERVER_ERROR,
        message: err.message
      });
    }
  }
};

const handleJoiErrors = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const customErrorResponse = {};
      if (err.error.details.length !== 0) {
          err.error.details.forEach(item => {
              customErrorResponse[`${item.context.key}`] = {
                  message: item.message,
                  context: item.context.label,
                  type: item.type
              };
        });
    }
    next(new BadRequest('Validation Error', customErrorResponse));
  } else {
    next(err);
  }
};

module.exports = { handleErr, handleJoiErrors };
