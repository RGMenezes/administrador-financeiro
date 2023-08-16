"use client";
import db from "@/api/axiosApi";
import { useEffect, useState } from "react";
import {MdEdit, MdDelete} from "react-icons/md";
import styles from "./page.module.css";

import AlertBox from "@/components/system/AlertBox";
import Loading from "@/components/system/Loader";
import LinkText from "@/components/system/LinkText";
import InputText from "@/components/form/InputText";
import InputNumber from "@/components/form/InputNumber";
import Button from "@/components/form/Button";

export default function Investment(){

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);
    
    const [investment, setInvestment] = useState([]);
    const [editIndex, setEditIndex] = useState(false);
    const [fade, setFade] = useState(false);
    
    function investmentEdit(index){
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

        const investmentCopy = investment.map((item, index) => {
            if(index == editIndex){
                return [e.target[`Text_${investment[index][0]}`].value, parseInt(e.target[`Number_${investment[index][0]}`].value)];
            };
            return item;
        });

        db.put("/edit/investment", investmentCopy).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                setInvestment(investmentCopy);
                editCancel();
            };
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
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

            {typeof editIndex == typeof 1 && (
                <form onSubmit={editSave} className={`${styles.form_edit} ${styles[fade]}`}>
                    <h3><strong>Editar</strong> <br/> {investment[editIndex][0]}</h3>
                    <div>
                        <InputText
                            text="Nome"
                            type="text"
                            placeholder="Nome da despesa"
                            id={`Text_${investment[editIndex][0]}`}
                            maxLenght={20}
                            defaultValue={investment[editIndex][0]}
                            required={true}
                        />
                        <InputNumber
                            text="Valor"
                            placeholder="Valor da despesa"
                            id={`Number_${investment[editIndex][0]}`}
                            min={0}
                            defaultValue={investment[editIndex][1]}
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