import passportStrategy from "passport-local";
const localStrategy = passportStrategy.Strategy;
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import db from "@/api/database/db";
import User from "../model/User";


export default function(passport) {
    db();

    passport.use(new localStrategy({usernameField: "email"}, (email, password, done) => {
        User.findOne({email: email}).then((user) => {
            if(!user){
                return done(null, false, {message: "Esta conta não exite!"});
            };
            bcrypt.compare(password, user.password, (err, match) => {
                if(match){
                    return done(null, user);
                }else{
                    return done(null, false, {message: "Senha incorreta"});
                };
            });

        }).catch((err) => {
            return done(null, false, {message: "Erro ao carregar o usuário!"});
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user)).catch(err => done(err, null));
    });
};