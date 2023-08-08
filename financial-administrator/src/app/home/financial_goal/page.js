"use client";
import db from "@/api/db";
import { useEffect, useState } from "react";
import {MdEdit, MdDelete} from "react-icons/md";
import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loader";
import LinkText from "@/components/system/LinkText";
import InputTextArea from "@/components/form/InputTextArea";
import InputNumber from "@/components/form/InputNumber";
import Button from "@/components/form/Button";

export default function FinancialGoal(){

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [goal, setGoal] = useState([]);
    const [editIndex, setEditIndex] = useState(false);
    const [fade, setFade] = useState(false);
    
    function goalEdit(index){
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

        const goalCopy = goal.map((item, index) => {
            if(index == editIndex){
                return [e.target[`Text_${goal[index][0]}`].value, parseInt(e.target[`Number_${goal[index][0]}`].value)];
            };
            return item;
        });

        db.put("/edit/financial_goal", goalCopy).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                setGoal(goalCopy);
                editCancel();
            };
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    };

    function goalDelete(index){
        setLoading(true);
        const goalCopy = [];

        for(let item = 0; item < goal.length; item++){
            if(item != index){
                goalCopy.push(goal[item]);
            };
        };

        db.put("/delete/financial_goal", goalCopy).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                setGoal(goalCopy);
            };
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        setLoading(true);

        db.get("/data").then((res) =>{
            setGoal(res.data.data.financialGoal);
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
                        text="Adicionar Meta"
                        to="/home/financial_goal/register"
                    />
                </div>
            </section>

            <section className={styles.container}>
                {goal.map((item, index) => (
                    <article key={`${item[0]}_${index}}`} className={styles.card}>
                        <p>{item[0]}</p>
                        <p>R${item[1]}</p>
                        <div className={styles.row_x}>
                            <MdEdit
                                tabIndex={0}
                                alt="Editar"
                                className={styles.icon}
                                onKeyDown={(e) => e.key == "Enter" && goalEdit(index)}
                                onClick={() => goalEdit(index)}
                            />
                            <MdDelete
                                tabIndex={0}
                                alt="Deletar"
                                className={styles.icon}
                                onKeyDown={(e) => e.key == "Enter" && goalDelete(index)}
                                onClick={() => goalDelete(index)}
                            />
                        </div>
                    </article>
                ))}
            </section>

            {typeof editIndex == typeof 1 && (
                <form onSubmit={editSave} className={`${styles.form_edit} ${styles[fade]}`}>
                    <h3><strong>Editar</strong> <br/> {goal[editIndex][0]}</h3>
                    <div>
                        <InputTextArea
                            text={goal[editIndex][0]}
                            id={`Text_${goal[editIndex][0]}`}
                            maxLength={100}
                            minLength={1}
                            rows={5}
                        />
                        <InputNumber
                            text="Valor"
                            placeholder="Valor da despesa"
                            id={`Number_${goal[editIndex][0]}`}
                            min={0}
                            defaultValue={goal[editIndex][1]}
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