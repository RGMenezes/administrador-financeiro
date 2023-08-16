"use client";
import { useState } from "react";
import db from "@/api/axiosApi";

import styles from "./styles.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loader";
import Logo from "../../../public/logo/logo";
import InputText from "@/components/form/InputText";
import InputNumber from "@/components/form/InputNumber";
import Button from "@/components/form/Button";
import Link from "@/components/system/LinkText";


export default function Register(){

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    function submitRegister(e){
        e.preventDefault();

        if(e.target.password.value === e.target.confirm_password.value){
            setLoading(true);

            const newUser = {
                userName: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                wage: e.target.wage.value
            };
    
            db.post("/register", newUser).then((res) => {
                setOnAlert({type: res.data.type, msg: res.data.msg});
            }).catch((err) => {
                setOnAlert({type: "error", msg:"Erro ao enviar o registro!"});
                console.log(`Erro ao enviar o registro: ${err}`);
            }).finally(() => setLoading(false));
        }else{
            setOnAlert({type: "error", msg:"As senhas não são iguais!"});
        };

    };

    return(
        <main className={styles.container_register}>

            <AlertBox alert={onAlert} />
            {loading && <Loading />}

            <div className={styles.logo}>
                <Logo />
            </div>
            
            <form onSubmit={submitRegister} autoComplete="on" className={styles.register} >
                <h1>Register</h1>

                <div className={styles.container_y}>
                    <InputText
                        type="text"
                        text="Nome"
                        placeholder="Nome completo"
                        id="name"
                        autoComplete="userName"
                        required={true}
                    />
                    <InputText
                        type="email"
                        text="E-mail"
                        placeholder="E-mail"
                        id="email"
                        autoComplete="email"
                        required={true}
                    />
                    <InputNumber 
                        text="Salário"
                        placeholder="Salário"
                        id="wage"
                        min={0}
                        required={true}
                    />
                    <InputText
                        type="password"
                        text="Senha"
                        placeholder="Senha"
                        id="password"
                        minLength={8}
                        autoComplete="new-password"
                        required={true}
                    />
                    <InputText
                        type="password"
                        text="Comfirmar senha"
                        placeholder="Digite sua senha novamente"
                        id="confirm_password"
                        minLength={8}
                        autoComplete="new-password"
                        required={true}
                    />
                </div>

                <div className={styles.container_y}>
                    <Button type="submit" text="Registrar" />
                    <Link to="/" text="Login" spaced={true} detach={true} />
                </div>

            </form>
        </main>
    );
};