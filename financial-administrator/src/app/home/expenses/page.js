"use client";
import api from "@/api/axiosApi";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {MdEdit, MdDelete} from "react-icons/md";
import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loader";
import LinkText from "@/components/system/LinkText";
import InputText from "@/components/form/InputText";
import InputNumber from "@/components/form/InputNumber";
import Button from "@/components/form/Button";

export default function Expenses(){
    const {data: session} = useSession();

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [expenses, setExpenses] = useState([]);
    const [editIndex, setEditIndex] = useState(false);
    const [fade, setFade] = useState(false);
    
    function expenseEdit(index){
        if(editIndex != index){
            setFade(false);
            setTimeout(() => {
                setEditIndex(false);
                setTimeout(() => {
                    setEditIndex(index);
                    setTimeout(() => setFade("fade"), 1);
                }, 100);
            }, 300);
        }else{
            setEditIndex(index);
            setTimeout(() => setFade("fade"), 1);
        };
    };
    function editCancel(){
        setFade(false);
        setTimeout(() => setEditIndex(false), 300);
    };
    function editSave(e){
        e.preventDefault();
        setLoading(true);

        const expenseCopy = expenses.map((item, index) => {
            if(index == editIndex){
                return [e.target[`Text_${expenses[index][0]}`].value, parseInt(e.target[`Number_${expenses[index][0]}`].value)];
            };
            return item;
        });

        api.put("/edit/expense", {id: session.user.id, expenses: expenseCopy}).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                setExpenses(expenseCopy);
                editCancel();
            };
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    };

    function expenseDelete(index){
        setLoading(true);
        const expensesCopy = [];

        for(let item = 0; item < expenses.length; item++){
            if(item != index){
                expensesCopy.push(expenses[item]);
            };
        };

        api.put("/delete/expense", {id: session.user.id, expenses: expensesCopy}).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                setExpenses(expensesCopy);
            };
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        setLoading(true);

        api.post("/data", {id: session.user.id}).then((res) =>{
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

            {typeof editIndex == typeof 1 && (
                <form onSubmit={editSave} className={`${styles.form_edit} ${styles[fade]}`}>
                    <h3><strong>Editar</strong> <br/> {expenses[editIndex][0]}</h3>
                    <div>
                        <InputText
                            text="Nome"
                            type="text"
                            placeholder="Nome da despesa"
                            id={`Text_${expenses[editIndex][0]}`}
                            maxLenght={20}
                            defaultValue={expenses[editIndex][0]}
                            required={true}
                        />
                        <InputNumber
                            text="Valor"
                            placeholder="Valor da despesa"
                            id={`Number_${expenses[editIndex][0]}`}
                            min={0}
                            defaultValue={expenses[editIndex][1]}
                            required={true}
                        />
                    </div>
                    <div className={styles.row_x}>
                        <Button 
                            text="Cancelar"
                            handleClick={editCancel}
                            type="button"
                        />
                        <Button 
                            text="Salvar"
                            type="submit"
                        />
                    </div>
                </form>
            )}
        </>
    );
};