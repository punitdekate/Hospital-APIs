import mongoose from "mongoose";
import UserModel from "./user.schema.js";
import ApplicationError from "../../utitlity/errorHandler/application.errorHandler.js";

export default class UserRepository {
  async create(userData) {
    try {
      const user = new UserModel(userData);
      const newUser = await user.save();
      return newUser;
    } catch (error) {
      throw new Error();
    }
  }

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new ApplicationError("user not found", 404);
      } else {
        return user;
      }
    } catch (error) {
      throw new ApplicationError(
        "Error fetching user: " + error.message,
        error instanceof ApplicationError ? error.statusCode : 500
      );
    }
  }
}
