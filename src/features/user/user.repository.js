import mongoose from "mongoose";
import { MongooseError } from "mongoose";
import UserModel from "./user.schema.js";
import ApplicationError from "../../utitlity/errorHandler/application.errorHandler.js";
import covidReportModel from "./report.schema.js";

export default class UserRepository {
    // common function for registration of doctor and patients
    async registerUser(userData, type) {
        try {
            userData.type = type;
            const user = new UserModel(userData);
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            if (error instanceof MongooseError) {
                throw error;
            } else {
                throw new ApplicationError(
                    "Error registering user: " + error.message, 400
                );
            }
        }
    }

    // common function retrieve the users data 
    async findUser(factor) {
        try {
            return await UserModel.findOne(factor);
        } catch (error) {
            if (error instanceof MongooseError) {
                throw error;
            } else {
                throw new ApplicationError(
                    "Error retrieving user: " + error.message, 400
                );
            }
        }
    }

    //function to create report of patient
    async createPatientReport(reportData, patientId, doctorId) {
        try {
            reportData.patientId = patientId;
            reportData.checkedBy = doctorId;
            console.log(reportData)
            const report = new covidReportModel(reportData);
            const createdReport = report.save();
            return createdReport;
        } catch (error) {
            if (error instanceof MongooseError) {
                throw error;
            } else {
                throw new ApplicationError(
                    "Error creating report: " + error.message, 400
                );
            }
        }
    }

    // function to get reports with specific filters
    async getReports(factor) {
        try {
            return await covidReportModel.find(factor);
        } catch (error) {
            if (error instanceof MongooseError) {
                throw error;
            } else {
                throw new ApplicationError(
                    "Error creating report: " + error.message, 400
                );
            }
        }
    }


}