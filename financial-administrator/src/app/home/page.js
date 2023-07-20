"use client";

import db from "@/api/db";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import Loading from "@/components/system/Loading";
import AlertBox from "@/components/system/AlertBox";
import LinkText from "@/components/system/LinkText";

export default function Home(){

    const [loading, setLoading] = useState(false);
    const [onAlert, setOnAlert] = useState({});

    const [userData, setUserData] = useState(false);

    useEffect(() => {
        setLoading(true);

        db.get("/data").then((res) => {
            setUserData(res.data.data);
            console.log(res.data.data);

        }).catch((err) => console.log(`Não foi possivel acessar o banco de dados: ${err}`))
        .finally(() => setLoading(false));
    }, []);

    return(
        <>
            {loading && <Loading />}
            <AlertBox alert={onAlert}/>
            {!userData ? 
                <section className={styles.container_data_register}>
                    <p>Nenhum dado encontrado, registre seus dados para utilizar o sistema!</p>
                    <LinkText 
                        text="Cadastrar dados"
                        to="/home/data/register"
                        detach={true}
                    />
                </section>
            :
                <div className={styles.container}>
                    <article className={styles.summary} >
                        resumo
                    </article>

                    <article className={styles.expense} >
                        despesas
                    </article> 

                    <article className={styles.investment} >
                        investimentos
                    </article>

                    <aside className={styles.goal} >
                        metas financeiras
                    </aside>

                    <aside className={styles.tips} >
                        {userData.guidance.map(element => element != userData.guidance[0] && 
                        (<section className={styles.card_tips}>
                            <p>{element}</p>
                        </section>))}
                    </aside>
                </div>
            }
        </>
    );
};