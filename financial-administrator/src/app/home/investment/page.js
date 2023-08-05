"use client";
import db from "@/api/db";
import { useEffect, useState } from "react";
import {MdEdit, MdDelete} from "react-icons/md";
import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loading";
import LinkText from "@/components/system/LinkText";

export default function Investment(){

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [investment, setInvestment] = useState([]);

    function investmentEdit(index){
        console.log(investment[index]);
    };

    function investmentDelete(index){
        setLoading(true);
        const investmentCopy = [];

        for(let item = 0; item < investment.length; item++){
            if(item != index){
                investmentCopy.push(investment[item]);
            };
        };

        db.put("/delete/investment", investmentCopy).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                setInvestment(investmentCopy);
            };
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        setLoading(true);

        db.get("/data").then((res) =>{
            setInvestment(res.data.data.investment);
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    }, []);

    return(
        <>
            <AlertBox alert={onAlert}/>
            {loading && <Loading />}

            <section className={styles.header}>
                <div></div>
                <h1>Investimentos</h1>
                <div className={styles.link}>
                    <LinkText
                        text="Adicionar investimento"
                        to="/home/investment/register"
                    />
                </div>
            </section>

            <section className={styles.container}>
                {investment.map((item, index) => (
                    <article key={`${item[0]}_${index}}`} className={styles.card}>
                        <h2>{item[0]}</h2>
                        <p>R${item[1]}</p>
                        <div className={styles.row_x}>
                            <MdEdit
                                tabIndex={0}
                                alt="Editar"
                                className={styles.icon}
                                onKeyDown={(e) => e.key == "Enter" && investmentEdit(index)}
                                onClick={() => investmentEdit(index)}
                            />
                            <MdDelete
                                tabIndex={0}
                                alt="Deletar"
                                className={styles.icon}
                                onKeyDown={(e) => e.key == "Enter" && investmentDelete(index)}
                                onClick={() => investmentDelete(index)}
                            />
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};