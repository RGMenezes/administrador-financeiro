import mongoose from "mongoose";

export default async function Database(){
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.DATABASE).then(() => {
    }).catch((err) => {
        console.error("Erro ao se conectar ao mongo...");
        console.error(err);
    });
};