import { NextResponse } from "next/server";
import Database from "@/api/database/Database";
import User from "@/api/model/User";
import Data from "@/api/model/Data";

import Response from "@/api/helper/Response";
import Administrator from "@/api/core/Administrator";

export async function PUT(req){
    Database();
    const res = NextResponse;
    const {id, investment, expense} = await req.json();

    try{
        const user = await User.findOne({_id: id});
        if(!user){
            return res.json(Response("error", "Não foi possível acessar os dados do usuário", "/home"));
        };

        const data = await Data.findById(id);
        if(data){
            res.json(Response("error", `Este usuário já possui dados cadastrados!`, "/home"));
        };

        const AdminRes = await Administrator(user.wage, investment, expense);
        if(!AdminRes){
            res.json(Response("error", `Erro ao conectar ao admin!`, "/home"));
        };

        data.investment = investment;
        data.expense = expense;
        data.financialReport = AdminRes;

        await data.save();

        return res.json(Response("success", "Dados editados com sucesso!", "/home"));
    }catch (err){
        return res.json(Response("error", "Erro ao editar dados!", "/home"));
    };
};