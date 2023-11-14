import winston from 'winston';

const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};

const requestLogger = winston.createLogger({
  level: 'http', // Log de nivel http para este logger
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export default requestLogger;