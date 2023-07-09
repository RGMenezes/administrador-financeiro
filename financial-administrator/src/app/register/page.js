"use client";
import { useState } from "react";
import db from "@/api/db";

import styles from "./styles.module.css";

import AlertBox from "@/components/system/AlertBox";
import Logo from "../../../public/logo/logo";
import InputText from "@/components/form/InputText";
import InputNumber from "@/components/form/InputNumber";
import Button from "@/components/form/Button";
import Link from "@/components/system/LinkText";


export default function Register(){
    const [onAlert, setOnAlert] = useState({});

    function submitRegister(e){
        e.preventDefault();

        const newUser = {

        };

        db.post("/register", newUser).then((res) => {

        }).catch((err) => {
            setOnAlert({type: "error", msg:"Erro ao enviar o registro!"});
            console.log(`Erro ao enviar o registro: ${err}`);
        });

    };

    return(
        <main className={styles.container_register}>

            <AlertBox alert={onAlert} />

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
                        required={true}
                    />
                    <InputText
                        type="email"
                        text="E-mail"
                        placeholder="E-mail"
                        id="email"
                        required={true}
                    />
                    <InputNumber 
                        text="Salário"
                        placeholder="Salário"
                        id="wage"
                        min={10}
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
                    <InputText
                        type="password"
                        text="Comfirmar senha"
                        placeholder="Digite sua senha novamente"
                        id="confirm_password"
                        minLength={8}
                        required={true}
                    />
                </div>

                <div className={styles.container_y}>
                    <Button type="submit" text="Registrar" />
                    <Link to="/" text="Login" spaced={true} />
                </div>

            </form>
        </main>
    );
};