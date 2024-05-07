import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import express from "express";
import dotenv from "dotenv";
import connectToMongoose from "./src/config/db.config.js";
import { errorHandler } from "./src/utitlity/errorHandler/application.errorHandler.js";
import logger from "./src/utitlity/logger.utility.js";
dotenv.config();
const server = express();

server.use(bodyParser.json());

//route for the users api
server.use('/api/users', userRouter);

//common error handler
server.use(errorHandler);
server.listen(process.env.PORT_NO, () => {
    console.log(`Server is listening on port no. ${process.env.PORT_NO}`);
    connectToMongoose();
});