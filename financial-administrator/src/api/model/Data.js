import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Data;

try{
    Data = mongoose.model("data");
}catch (error){
    const DataSchema = new Schema({
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

    Data = mongoose.model("data", DataSchema);
};


export default Data;