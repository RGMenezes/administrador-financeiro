'use client';
import db from "@/api/db";
import { useState } from "react";

import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";

import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";
import Link from "@/components/system/LinkText";
import Logo from "../../public/logo/logo.js";

export default function Page(){
    const [onAlert, setOnAlert] = useState({});

    async function submitLogin(e){
        e.preventDefault();

        db.post("/login", {email: e.target.email.value, password: e.target.password.value}).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "error"){
            }else{
            };
        }).catch((err) => {
            console.error(`Erro no banco de dados: ${err}`);
        });
    };

    return (
        <main className={styles.container_login}>

            <AlertBox alert={onAlert} />

            <div className={styles.logo}>
                <Logo />
            </div>
            
            <form onSubmit={submitLogin} autoComplete="on" className={styles.login} >
                <h1>Login</h1>

                <div className={styles.container_y}>
                    <InputText
                        type="email"
                        text="E-mail"
                        placeholder="E-mail"
                        id="email"
                        autoComplete="email"
                        required={true}
                    />
                    <InputText
                        type="password"
                        text="Senha"
                        placeholder="Senha"
                        id="password"
                        autoComplete="current-password"
                        minLength={8}
                        required={true}
                    />
                </div>

                <div className={styles.container_y}>
                    <Button type="submit" text="Entrar" />
                    <Link to="/register" text="Registrar-se" spaced={true} />
                </div>

            </form>
        </main>
    );
};