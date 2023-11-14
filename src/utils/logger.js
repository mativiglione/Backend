import winston from 'winston';

const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};

const developmentLogger = winston.createLogger({
  levels: logLevels,
  level: 'debug',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

const productionLogger = winston.createLogger({
  levels: logLevels,
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});

export const getLogger = () => {
  return process.env.NODE_ENV === 'production'
    ? productionLogger
    : developmentLogger;
};