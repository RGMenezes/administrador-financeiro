import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Data = new Schema({
    investment: {
        type: Array,
        default: []
    },
    expense: {
        type: Array,
        default: []
    },
    financialGoal: {
        type: Array,
        default: []
    },
    financialReport: {
        type: Object
    },
    id:{
        type: String,
        require: true
    }
});

export default mongoose.model("data", Data);