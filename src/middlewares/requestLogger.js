import { logger } from "../utils/logger.js";

export function requestLogger(req, res, next) {
  //Middleware de Info, va a logear cada llamada a un endpoint.(se aplica en el main, antes de las porque es un middleware)
  logger.info(
    `Request ${req.method} - ${req.url} - Date: ${new Date().toLocaleString()}`
  );
  next();
}
