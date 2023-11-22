import { Router } from "express";
import { logger } from '../utils/logger.js';

const loggerRouter = Router();//Aca acomodar un poco para mantener la logica de los otros controllers, importarlo al index.routes, etc.


loggerRouter.get('/loggerTest', (req, res) => {
  logger.debug('This is a debug message.');
  logger.http('This is an HTTP message.');
  logger.info('This is an info message.');
  logger.warning('This is a warning message.');
  logger.error('This is an error message.');
  logger.fatal('This is a fatal message.');

  res.send('Logging test completed. Check your logs.');
});

export default loggerRouter;