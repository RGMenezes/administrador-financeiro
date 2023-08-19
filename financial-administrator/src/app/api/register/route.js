import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Database from "@/api/database/Database";
import User from "@/api/model/User";

import Response from "@/api/helper/Response";

export async function POST(req) {
  Database();
  const res = NextResponse;
  const { userName, email, password, wage } = await req.json();

  try {
    const userExists = await User.findOne({ userName: userName });
    if (userExists) {
      return res.json(Response("error", "Nome de usuário já cadastrado!", "/register"));
    };

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.json(Response("error", "E-mail já cadastrado!", "/register"));
    };

    const newUser = new User({
      userName: userName,
      email: email,
      password: password,
      wage: wage,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    return res.json(Response("success", "Usuário cadastrado com sucesso! Faça login para acessar sua conta.", "/register"));
  } catch (err) {
    return res.json(Response("error", "Houve um erro ao cadastrar o usuário!", "/register"));
  };
};
