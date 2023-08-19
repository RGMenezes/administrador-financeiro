import { NextResponse } from "next/server";
import Database from "@/api/database/Database";
import User from "@/api/model/User";
import Data from "@/api/model/Data";

import Response from "@/api/helper/Response";

export async function PUT(req){
    Database();
    const res = NextResponse;
    const {id, goals} = await req.json();

    try{
        const user = await User.findOne({_id: id});
        if(!user){
            return res.json(Response("error", "Não foi possível acessar os dados do usuário", "/home"));
        };

        const data = await Data.findById(id);
        if(!data){
            return res.json(Response("error", `Este usuário não possui dados cadastrados!`, "/home"));
        };

        data.financialGoal = goals;

        await data.save();

        return res.json(Response("success", "Dados deletados com sucesso!", "/home"));
    }catch (err){
        return res.json(Response("error", "Erro ao deletar dados!", "/home"));
    };
};