"use client";
import db from "@/api/db";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loading";

export default function Expenses(){

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        setLoading(true);

        db.get("/data").then((res) =>{
            setExpenses(res.data.data.expense);
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    }, []);

    

    return(
        <>
            <AlertBox alert={onAlert}/>
            {loading && <Loading />}

            <section className={styles.container}>
                {expenses.map((item, index) => {
                    <article className={styles.card}>
                        <h1>{item[0]}</h1>
                        <p>R${item[1]}</p>
                        <div>
                            
                        </div>
                </article>
                })}
            </section>
        </>
    );
};