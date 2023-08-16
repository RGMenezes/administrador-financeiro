import { NextResponse } from "next/server";

import passport from "passport";
import configureAuth from "@/api/config/auth"

import Response from "@/api/helper/Response";

export async function POST(req){
    const res = NextResponse;

    console.log(req)

    // configureAuth(passport);

    // passport.authenticate("local", (err, user, info) => {
    //     if (err) { return next(err) };
    //     if (!user) { res.json(Response("error", info.message, "/")) };
    //     req.logIn(user, function(err) {
    //         if (err) { return err };
    //         res.json(Response("success", "Usuário logado com sucesso!", "/home"));
    //     });
    // });
};