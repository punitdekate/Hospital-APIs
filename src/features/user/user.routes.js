import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middleware/jwtAuth.middleware.js";
const userRouter = express.Router();

const userController = new UserController();

//registration of doctor user
userRouter.post("/doctor/register", (req, res, next) => {
    userController.createDoctorUser(req, res, next);
});

//login of doctor user
userRouter.post("/doctor/login", (req, res, next) => {
    userController.loginDoctorUser(req, res, next);
});

//registration of patient user 
userRouter.post("/patient/register", (req, res, next) => {
    userController.createPatientUser(req, res, next);
});

//creation of report by doctor
userRouter.post("/patients/:id/create_report", jwtAuth, (req, res, next) => {
    userController.createReport(req, res, next);
});

//get all reports of particular patient
userRouter.get("/patients/:id/all_reports", jwtAuth, (req, res, next) => {
    userController.getReports(req, res, next);
});

// get all patients with specific status 
userRouter.get("/reports/:status", jwtAuth, (req, res, next) => {
    userController.getReportsSpecificStatus(req, res, next);
});


export default userRouter;