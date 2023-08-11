"use client";
import db from "@/api/db";
import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import styles from "./page.module.css";

import Loader from "@/components/system/Loader";
import AlertBox from "@/components/system/AlertBox";

export default function Setting(){
    const [alert, setAlert] = useState([]);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});

    const [sections, setSections] = useState({
        data: true,
        editData: "slide_right",
        other: "slide_right"
    });

    function slideSections(orientation){
        if(orientation){
            if(sections.data === true){
                setSections({
                    data: "slide_left",
                    editData: true,
                    other: "slide_right"
                });
            } else if(sections.editData === true){
                setSections({
                    data: "slide_left",
                    editData: "slide_left",
                    other: true
                });
            }else{
                setSections({
                    data: "slide_left",
                    editData: true,
                    other: "slide_right"
                });
                setTimeout(() => {
                    setSections({
                        data: true,
                        editData: "slide_right",
                        other: "slide_right"
                    });
                }, 150);
            };
        }else{
            if(sections.data === true){
                setSections({
                    data: "slide_left",
                    editData: true,
                    other: "slide_right"
                });
                setTimeout(() => {
                    setSections({
                        data: "slide_left",
                        editData: "slide_left",
                        other: true
                    });
                }, 150);
            } else if(sections.editData === true){
                setSections({
                    data: true,
                    editData: "slide_right",
                    other: "slide_right"
                });
            }else{
                setSections({
                    data: "slide_left",
                    editData: true,
                    other: "slide_right"
                });
            };
        };
    };

    useEffect(() => {
        setLoading(true);

        db.get("/user").then((res) =>{
            setUser(res.data.data);
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));

        db.get("/data").then((res) =>{
            setUserData(res.data.data);
        }).catch(err => console.log(`Erro ao conectar com o servidor: ${err}`))
        .finally(() => setLoading(false));
    }, []);
    
    return(
        <>
            <AlertBox alert={alert} />
            {loading && <Loader />}

            <section className={styles.settings}>
                <h1>Configurações</h1>

                <header className={styles.header}>
                    <div className={styles.container_x}>
                        <BsArrowLeftCircleFill 
                            tabIndex="0" className={styles.icon} 
                            onKeyDown={(e) => e.key == "Enter" && slideSections(false)} 
                            onClick={() => slideSections(false)} 
                        />
                        <p className={`${sections.data === true && styles.selected}`}>
                            Meus dados
                        </p>
                        <p className={`${sections.editData === true && styles.selected}`}>
                            Editar dados
                        </p>
                        <p className={`${sections.other === true && styles.selected}`}>
                            Outros
                        </p>
                        <BsArrowRightCircleFill 
                            tabIndex="0" className={styles.icon}
                            onKeyDown={(e) => e.key == "Enter" && slideSections(true)}
                            onClick={() => slideSections(true)} 
                        />
                    </div>
                </header>

                <div className={styles.sections}>

                    <section className={`${styles.section} ${styles[sections.data]}`}>
                        <article>
                            <h2>Usuário</h2>
                            <p>{user.fullName}</p>
                            <p>{user.email}</p>
                            <p>Seu salário é de R${user.wage}</p>
                        </article>
                        <article>
                            <h2>Finanças</h2>
                            
                            <h3>Investimentos</h3>
                            <ul>{userData.investment && userData.investment.map((item, index) => (
                                <li key={`${item[0]}_${index}`}>{item[0]} - R${item[1]}</li>
                            ))}</ul>

                            <h3>Despesas</h3>
                            <ul>{userData.expense && userData.expense.map((item, index) => (
                                <li key={`${item[0]}_${index}`}>{item[0]} - R${item[1]}</li>
                            ))}</ul>

                            <h3>Metas</h3>
                            <section>{userData.financialGoal && userData.financialGoal.map((item, index) => (
                                <aside key={`${item[0]}_${index}`}>{item[0]} <br/> R${item[1]}</aside>
                            ))}</section>
                        </article>
                    </section>

                    <section className={`${styles.section} ${styles[sections.editData]}`}>
                        <p>editar</p>
                    </section>

                    <section className={`${styles.section} ${styles[sections.other]}`}>
                        <p>outros</p>
                    </section>
                    
                </div>
            </section>
        </>
    );
};