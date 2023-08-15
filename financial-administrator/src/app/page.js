'use client';
import db from "@/api/db";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loader";

import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";
import Link from "@/components/system/LinkText";
import Logo from "../../public/logo/logo.js";

export default function Page(){
    const [onAlert, setOnAlert] = useState({});
    const [loading, setloding] = useState(false);

    const router = useRouter();

    async function submitLogin(e){
        e.preventDefault();
        setloding(true)

        db.post("/login", {email: e.target.email.value, password: e.target.password.value}).then((res) => {
            console.log(res)
            setOnAlert(res.data);
            router.push(res.data.redirect);
        }).catch((err) => {
            console.error(`Erro no banco de dados: ${err}`);
        }).finally(() => setloding(false));
    };

    return (
        <main className={styles.container_login}>

            <AlertBox alert={onAlert} />
            {loading && <Loading />}

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
                    <Link to="/register" text="Registrar-se" spaced={true} detach={true} />
                </div>

            </form>
        </main>
    );
};