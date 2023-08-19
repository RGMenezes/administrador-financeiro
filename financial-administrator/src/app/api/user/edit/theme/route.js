import { NextResponse } from "next/server";
import Database from "@/api/database/Database";
import User from "@/api/model/User";

import Response from "@/api/helper/Response";

export async function PUT(req){
    Database();
    const res = NextResponse;
    const {id, theme} = await req.json();

    return User.findOne({_id: id}).then((findUser) => {
        findUser.theme = theme;
        
        return findUser.save().then(() => {
            return res.json(Response("success", "Tema atualizado!", "/home"));
        }).catch((err) => {
            return res.json(Response("error", "Não foi possível salvar o tema no banco de dados!", "/home"));
        });
    }).catch((err) => {
        return res.json(Response("error", "Usuário não encontrado para atualizar tema!", "/home"));
    });
};


