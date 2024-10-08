import mongoose from "mongoose";


const { Schema } = mongoose;

const userSchema = new Schema({

    fullName: {
        type: String,
        uppercase: true,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    }
})



const userModel = mongoose.model("user", userSchema);

export default userModel;