'use client';
import api from "../api/db";

import styles from "./page.module.css";

import InputText from "../components/form/InputText";
import Button from "@/components/form/Button";
import Link from "@/components/form/LinkText";
import Logo from "../../public/logo/logo.js";

export default function Page(){

    async function submitLogin(e){
        e.preventDefault();

        api.post("/login", {email: e.target.email.value, password: e.target.password.value}).then((res) => {

        }).catch((err) => {
            console.error(`Erro na api: ${err}`);
        });
    };

    return (
        <main className={styles.container_login}>

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
                        required={true}
                    />
                    <InputText
                        type="password"
                        text="Senha"
                        placeholder="Senha"
                        id="password"
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