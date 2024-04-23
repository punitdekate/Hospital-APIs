import express from "express";
import UserController from "./user.controller.js";
const userRouter = express.Router();

const userController = new UserController();
userRouter.post("/register", (req, res, next) => {
  userController.createUser(req, res, next);
});
