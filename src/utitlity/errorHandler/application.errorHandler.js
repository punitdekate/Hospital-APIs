import { MongooseError } from "mongoose";
import logger from "../logger.utility.js";
//custom error handler for the error handling
export default class ApplicationError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}


const errorHandler = (err, req, res, next) => {
    const logData = `${new Date().toString()}\n Request URL: ${req.url}\nRequest Body: ${JSON.stringify(req.body)}\nError : ${err}`;
    logger.error(logData);
    if (err instanceof MongooseError) {
        //handle the database error
        if (err.name == 'ValidationError') {
            const errorMessage = Object.values(err.errors).map(val => val.message);
            return res.status(500).json({
                "success": false,
                "msg": errorMessage
            })
        }
    } else if (err instanceof ApplicationError) {
        //handle the application level error
        return res.status(500).json({
            "success": err.code,
            "msg": err.message,
            // "name": err.name,
            // "stack": err.stack
        })
    } else {
        //handle the server related error
        return res.status(500).json({
            "success": false,
            "msg": "there is some server issue please try later"
        })
    }
}

export { errorHandler };