import { logger } from "../utils/logger.js"

export default class CustomError {
    static createError ({name="Error", cause, message, code=1}){
        const error = new Error(message, {cause});
        error.name=name;
        error.code=code;
        logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)
        throw error;
    }
}