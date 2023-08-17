import mongoose from "mongoose";
const Schema = mongoose.Schema;

let User;

try {
    User = mongoose.model("users");
} catch (error) {
    const UserSchema = new Schema({
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

    User = mongoose.model("users", UserSchema);
};

export default User;