import { MongooseError } from "mongoose";
import UserRepository from "./user.repository.js";
import ApplicationError from "../../utitlity/errorHandler/application.errorHandler.js";

export default class UserController {
    constructor() {
            this.userRepository = new UserRepository();
        }
        // -------------------------------------------Doctor-------------------------------------//

    async createDoctorUser(req, res, next) {
        try {
            const isUser = await this.userRepository.findUser({ email: req.body.email });
            if (!isUser) {
                const user = await this.userRepository.registerUser(req.body, "Doctor");
                return res.status(201).json({
                    success: true,
                    msg: "user created successfully",
                    data: user,
                });
            } else {
                const isPasswordValid = await isUser.compare(req.body.password);
                if (!isPasswordValid) {
                    return res.status(400).json({
                        success: false,
                        msg: "invalid password user already registered"
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        msg: "user already registered",
                        data: isUser,
                    });
                }
            }
        } catch (error) {
            if (error instanceof MongooseError || error instanceof ApplicationError) {
                next(error);
            } else {
                next(
                    new ApplicationError(
                        "Error registering user: " + error.message, 400
                    ));
            }
        }
    }

    async loginDoctorUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    msg: "email and password is required"
                });
            }
            const user = await this.userRepository.findUser({ email: email, type: "Doctor" });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    msg: "user not registered"
                });
            } else {
                const isPasswordValid = await user.compare(password);
                if (!isPasswordValid) {
                    return res.status(400).json({
                        success: false,
                        msg: "invalid password"
                    });
                } else {
                    const token = await user.generateJwtToken();
                    return res.status(200).json({
                        success: true,
                        msg: "user logged in successfully",
                        token: token,
                    });
                }
            }
        } catch (error) {
            if (error instanceof MongooseError || error instanceof ApplicationError) {
                next(error);
            } else {
                next(
                    new ApplicationError(
                        "Error login user: " + error.message, 400
                    ));
            }
        }
    }


    // -------------------------------------------Patient------------------------------------- //

    async createPatientUser(req, res, next) {
        try {
            const isUser = await this.userRepository.findUser({ mobile: req.body.mobile, type: "Patient" });
            if (!isUser) {
                const user = await this.userRepository.registerUser(req.body, "Patient");
                return res.status(201).json({
                    success: true,
                    msg: "user created successfully",
                    data: user,
                });
            } else {
                const isPasswordValid = await isUser.compare(req.body.password);
                if (!isPasswordValid) {
                    return res.status(400).json({
                        success: false,
                        msg: "invalid password user already registered"
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        msg: "user already registered",
                        data: isUser,
                    });
                }
            }
        } catch (error) {
            if (error instanceof MongooseError || error instanceof ApplicationError) {
                next(error);
            } else {
                next(
                    new ApplicationError(
                        "Error registering user: " + error.message, 400
                    ));
            }
        }
    }


    // -------------------------------------------Checkup------------------------------------- //

    async createReport(req, res, next) {
        try {
            const patientId = req.params.id;
            const doctorId = req.user.id;
            if (req.user.type != "Doctor") {
                return res.status(400).json({
                    success: false,
                    msg: "only doctors are authorize to create report"
                });
            } else {
                const report = await this.userRepository.createPatientReport(req.body, patientId, doctorId);
                return res.status(201).json({
                    success: true,
                    msg: "report created successfully",
                    data: report
                });
            }

        } catch (error) {
            if (error instanceof MongooseError || error instanceof ApplicationError) {
                next(error);
            } else {
                next(
                    new ApplicationError(
                        "Error creating report: " + error.message, 400
                    ));
            }
        }
    }

    async getReports(req, res, next) {
        try {
            const reports = await this.userRepository.getReports({ patientId: req.params.id });
            return res.status(200).json({
                success: true,
                msg: "reports retrieved successfully",
                data: reports
            });
        } catch (error) {
            if (error instanceof MongooseError || error instanceof ApplicationError) {
                next(error);
            } else {
                next(
                    new ApplicationError(
                        "Error creating report: " + error.message, 400
                    ));
            }
        }
    }

    async getReportsSpecificStatus(req, res, next) {
        try {
            const reports = await this.userRepository.getReports({ status: req.params.status });
            return res.status(200).json({
                success: true,
                msg: "reports retrieved successfully",
                data: reports
            });
        } catch (error) {
            if (error instanceof MongooseError || error instanceof ApplicationError) {
                next(error);
            } else {
                next(
                    new ApplicationError(
                        "Error creating report: " + error.message, 400
                    ));
            }
        }
    }
}