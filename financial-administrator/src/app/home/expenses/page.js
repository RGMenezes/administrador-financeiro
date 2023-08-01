"use client";
import db from "@/api/db";
import { useEffect, useState } from "react";
import {MdEdit, MdDelete} from "react-icons/md";
import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loading";
import LinkText from "@/components/system/LinkText";

export default function Expenses(){

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [expenses, setExpenses] = useState([]);

    function expenseEdit(index){
        console.log(expenses[index]);
    };

    function expenseDelete(index){
        setLoading(true);
        const expensesCopy = [];

        for(let item = 0; item < expenses.length; item++){
            if(item != index){
                expensesCopy.push(expenses[item]);
            };
        };

        db.put("/delete/expense", expensesCopy).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                setExpenses(expensesCopy);
            };
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    };

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

            <section className={styles.header}>
                <div></div>
                <h1>Despesas</h1>
                <div className={styles.link}>
                    <LinkText
                        text="Adicionar despesa"
                        to="/home/expenses/register"
                    />
                </div>
            </section>

            <section className={styles.container}>
                {expenses.map((item, index) => (
                    <article key={`${item[0]}_${index}}`} className={styles.card}>
                        <h2>{item[0]}</h2>
                        <p>R${item[1]}</p>
                        <div className={styles.row_x}>
                            <MdEdit
                                tabIndex={0}
                                alt="Editar"
                                className={styles.icon}
                                onKeyDown={(e) => e.key == "Enter" && expenseEdit(index)}
                                onClick={() => expenseEdit(index)}
                            />
                            <MdDelete
                                tabIndex={0}
                                alt="Deletar"
                                className={styles.icon}
                                onKeyDown={(e) => e.key == "Enter" && expenseDelete(index)}
                                onClick={() => expenseDelete(index)}
                            />
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};