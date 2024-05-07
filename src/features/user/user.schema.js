import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Name should be at least 5 characters long"],
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        validate: {
            validator: function(mail) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
            },
            message: "Email is not valid",
        },
        required: [true, "Email is required"],
        unique: [true, "Email is already taken"],
    },
    mobile: {
        type: Number,
        required: true,
        match: [/^[0-9]{10}$/, "Please enter a valid phone number"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    type: {
        type: String,
        enum: ["Doctor", "Patient"],
        required: [true, "Type is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpiry: {
        type: String,
    },
});

userSchema.pre("save", async function(next) {
    try {
        //encrypt the password to store in database 
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateJwtToken = async function() {
    //to generate the jwt token
    return await jwt.sign({ id: this._id, name: this.name, email: this.email, type: this.type },
        process.env.JWT_SECRET, { expiresIn: "1h" }
    );
};

userSchema.methods.compare = async function(password) {
    //compare the user password for login
    return await bcrypt.compare(password, this.password);
};


const UserModel = mongoose.model("User", userSchema);
export default UserModel;