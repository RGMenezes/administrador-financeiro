import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Database from "@/api/database/Database";

import User from "@/api/model/User";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const {email, password} = credentials;
                
                return new Promise((resolve, reject) => {
                    Database();

                    User.findOne({email: email}).then((user) => {
                        
                        if(!user){
                            reject("Esta conta não exite!");
                        };
                        bcrypt.compare(password, user.password, (err, match) => {
                            if(match){
                                resolve(user);
                            }else{
                                reject("Senha incorreta!");
                            };
                        });
            
                    }).catch((err) => {
                        reject("Erro ao carregar o usuário!");
                    });
                }).then((res) => {
                    return res;
                }).catch((err) => {
                    throw new Error(err);
                });
            }
        })
    ],
    pages: {
        signIn: '/home',
        signOut: '/',
        error: '/'
    }
    
});

export { handler as GET, handler as POST };