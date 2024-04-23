import express from "express";
import dotenv from "dotenv";
import connectToMongoose from "./config/db.config.js";

dotenv.config();
const server = express();

server.listen(3000, () => {
  console.log(`Server is listening on port no. ${process.env.PORT_NO}`);
  connectToMongoose();
});

export default server;
