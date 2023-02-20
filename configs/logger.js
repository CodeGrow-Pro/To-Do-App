// const {createLogger,transports,format} = require('winston');

// const logger = createLogger({
//     level: "info",
//     transports:[
//         new transports.Console({
//             format:format.combine(format.timestamp(),format.simple())
//         }),
//         // new transports.File({
//         //     filename:"info.log",
//         //     level: "info",
//         //     format:format.combine(format.timestamp(),format.simple())
//         // })
//     ]
// })
const winston = require('winston')
const logger = winston.createLogger({
    // level: 'warn',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' ,level:'info'}),
    ],
  });
 
module.exports = {logger}