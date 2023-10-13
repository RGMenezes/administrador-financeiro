'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loader";
import InputText from "@/components/form/InputText";
import Button from "@/components/form/Button";
import Link from "@/components/system/LinkText";
import Logo from "../../public/logo/logo.js";

export default function Page(){
    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    function submitLogin(e){
        e.preventDefault();
        setLoading(true)
        
        signIn("credentials", {email: e.target.email.value, password: e.target.password.value, redirect: false}).then((res) => {
            if(!res.error){
                setOnAlert({type: "success", msg:"Usuário logado com sucesso!"});
                router.push("/home");
            }else{
                setOnAlert({type: "error", msg: res.error});
            };
        }).catch((err) => {
            console.log(`Erro ao acessar o servidor: ${err}`);
        }).finally(() => setLoading(false))
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