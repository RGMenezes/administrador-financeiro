import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    wage: {
        type: Number, 
        require: true
    },
    theme: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("users", User);