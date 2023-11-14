import express from 'express';
import { getLogger } from '../utils/logger.js';

const router = express.Router();
const logger = getLogger();

router.get('/loggerTest', (req, res) => {
  logger.debug('This is a debug message.');
  logger.http('This is an HTTP message.');
  logger.info('This is an info message.');
  logger.warning('This is a warning message.');
  logger.error('This is an error message.');
  logger.fatal('This is a fatal message.');

  res.send('Logging test completed. Check your logs.');
});

export default router;