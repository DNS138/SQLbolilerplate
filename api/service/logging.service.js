import winston from 'winston' ;

export const loggerService = function(){
    winston.add(new winston.transports.Console, { level: 'info'});
};
