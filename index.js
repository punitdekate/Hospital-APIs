import bodyParser from "body-parser";
import userRouter from "./src/features/user/user.routes.js";
import express from "express";
import dotenv from "dotenv";
import connectToMongoose from "./src/config/db.config.js";
import { errorHandler } from "./src/utitlity/errorHandler/application.errorHandler.js";
dotenv.config();
const server = express();

server.use(bodyParser.json());

server.use('/api/users', userRouter);


server.use(errorHandler);
server.listen(process.env.PORT_NO, () => {
    console.log(`Server is listening on port no. ${process.env.PORT_NO}`);
    connectToMongoose();
});