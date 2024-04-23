import { MongooseError } from "mongoose";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(req, res, next) {
    try {
      const isUser = await this.userRepository.findByEmail(req.body.email);
      if (!isUser) {
        const user = await this.userRepository.create(req.body);
        const token = await user.generateJwtToken();
        return res.status(201).json({
          success: true,
          msg: "user created successfully",
          token: token,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
