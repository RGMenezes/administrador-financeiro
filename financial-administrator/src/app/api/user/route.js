import { NextResponse } from "next/server";
import Database from "@/api/database/Database";
import User from "@/api/model/User";

import Response from "@/api/helper/Response";

export async function POST(req){
    Database();
    const res = NextResponse;
    const {id} = await req.json();

    return User.findOne({_id: id}).then((user) => {
        const userCorrected = {
            name: user.userName.split(" ")[0],
            fullName: user.userName,
            email: user.email,
            wage: user.wage,
            theme: user.theme,
            id: user._id
        };
        return res.json(Response("object", userCorrected, "/home"));
    }).catch((err) => {
        return res.json(Response("error", "Não foi possível acessar os dados do usuário", "/home"));
    });
};