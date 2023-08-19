import { NextResponse } from "next/server";
import Database from "@/api/database/Database";
import Data from "@/api/model/Data";

import Response from "@/api/helper/Response";

export async function POST(req){
    Database();
    const res = NextResponse;
    const {id} = await req.json();

    return Data.findById(id).then((data) => {
        return res.json(Response("object", data, "/home"));
    }).catch((err) => res.json(Response("error", "Não foi possível encontrar os dados", "/home")));
};