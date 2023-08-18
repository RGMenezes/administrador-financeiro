import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/api/config/auth";

import Response from "@/api/helper/Response";

export async function POST(req){
    const res = NextResponse;

    return res.json(Response("object", "userCorrected", "/home"));
};

// const userCorrected = {
//     name: req.user.userName.split(" ")[0],
//     fullName: req.user.userName,
//     email: req.user.email,
//     wage: req.user.wage,
//     theme: req.user.theme,
//     id: req.user._id
// };
// res.json(Response("object", userCorrected, "/home"));