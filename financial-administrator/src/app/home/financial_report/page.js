"use client";
import api from "@/api/axiosApi";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loader from "@/components/system/Loader";
import LinkText from "@/components/system/LinkText";

export default function FinancialReport(){
    const {data: session} = useSession();
    const [onAlert, setOnAlert] = useState([]);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setLoading(true);

        api.post("/user", {id: session.user.id}).then((res) =>{
            setUser(res.data.data);
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));

        api.post("/data", {id: session.user.id}).then((res) =>{
            setUserData(res.data.data);
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    }, []);

    return(
        <>
            <AlertBox alert={onAlert} />
            {loading && <Loader />}

            <div className={styles.container}>

                <h1>Relatório financeiro</h1>
                
                <article id="Positives" className={styles.article}>
                    <h2>Pontos Positivos</h2>
                    <p>{userData.financialReport && userData.financialReport.Positives}</p>
                </article>

                <article id="Demerits" className={styles.article}>
                    <h2>Pontos Negativos</h2>
                    <p>{userData.financialReport && userData.financialReport.Demerits}</p>
                </article>

                <article id="Improvements" className={styles.article}>
                    <h2>O que melhorar?</h2>
                    <p>{userData.financialReport && userData.financialReport.Improvements}</p>
                </article>

                <section className={styles.container_tips}>
                    <h2>Dicas</h2>
                    <ul id="Tips" className={styles.tips}>
                        {userData.financialReport && userData.financialReport.tips.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>

                <LinkText 
                    text="Voltar"
                    type="back"
                />
            </div>
        </>
    );
};