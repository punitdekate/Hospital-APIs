import mongoose from "mongoose";
const covidReportSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "patientId is required"]
    },
    status: {
        type: String,
        enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine",
            "Positive-Admit"
        ],
        required: [true, "status is required"]
    },
    checkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "checkedBy is required"]
    },
    checkedDate: {
        type: Date,
        default: Date.now(),
    },
    checkedResult: {
        type: String,
        enum: ['approved', 'rejected', 'pending'],
        required: [true, "checkedResult is required"]
    }
});


// Create the COVID report model
const covidReportModel = mongoose.model('CovidReport', covidReportSchema);
export default covidReportModel;