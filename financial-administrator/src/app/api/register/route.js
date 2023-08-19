import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Database from "@/api/database/Database";
import User from "@/api/model/User";

import Response from "@/api/helper/Response";

export async function POST(req){
    Database();
    const res = NextResponse;
    const {userName, email, password, wage} = await req.json();

    return new Promise((resolve, reject) => {
        User.findOne({userName: userName}).then((user) => {
            if(user){
                reject(res.json(Response("error", "Nome de usuário já cadastrado!", "/register")));
            }else{
                User.findOne({email: email}).then((findEmail) => {
                    if(findEmail){
                        reject(res.json(Response("error", "E-mail já cadastrado!", "/register")));
                    }else{
                        const newUser = new User({
                            userName: userName,
                            email: email,
                            password: password,
                            wage: wage
                        });
        
                        bcrypt.genSalt(10, (error, salt) => {
                            bcrypt.hash(newUser.password, salt, (error, hash) => {
                                if(error){
                                    reject(res.json(Response("error", "Erro ao cadastrar usuário!", "/register")));
                                };
        
                                newUser.password = hash;
        
                                newUser.save().then(() => {
                                    resolve(res.json(Response("success", "Usuário cadastrado com sucesso! Faça login para acessar sua conta.", "/register")));
                                }).catch((err) => {
                                    reject(res.json(Response("error", "Erro ao cadastrar usuário!", "/register")));
                                });
        
                            });
                        });
                    }
                }).catch((err) => {
                    reject(res.json(Response("error", "Houve um erro ao verificar o email!", "/register")));
                });
            }
        }).catch((err) => {
            reject(res.json(Response("error", "Houve um erro ao verificar o nome de usuário!", "/register")));
        });
    }).then(res => res)
    .catch(err => err);
};