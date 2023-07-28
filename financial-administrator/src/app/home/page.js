"use client";

import db from "@/api/db";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import Loading from "@/components/system/Loading";
import AlertBox from "@/components/system/AlertBox";
import LinkText from "@/components/system/LinkText";
import GraphSectors from "@/components/graph/GraphSectors";
import GraphColumns from "@/components/graph/GraphColumns";
import GraphSubtitle from "@/components/graph/GraphSubtitle";

export default function Home(){

    const [loading, setLoading] = useState(false);
    const [onAlert, setOnAlert] = useState({});

    const [userData, setUserData] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setLoading(true);

        db.get("/user").then((res) => {
            setUser(res.data.data);
        }).catch((err) => console.log(`Não foi possivel acessar o banco de dados: ${err}`))
        .finally(() => setLoading(false));

        db.get("/data").then((res) => {
            setUserData(res.data.data);
        }).catch((err) => console.log(`Não foi possivel acessar o banco de dados: ${err}`))
        .finally(() => setLoading(false));
    }, []);

    const totalDataUser = (arrayData) => arrayData.map(item => item = item[1]).reduce((acc, cur) => acc + cur, 0); 

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
                        <h2>{user.name}</h2>
                        <ul>
                            <li><strong>Salário: R${user.wage}</strong></li>
                            <li>Investimentos: R${`${totalDataUser(userData.investment)}`}</li>
                            <li>Despesas: R${`${totalDataUser(userData.expense)}`}</li>
                        </ul>

                        <GraphSubtitle 
                            data={[["Investimentos", totalDataUser(userData.investment)], ["Despesas", totalDataUser(userData.expense)]]}
                            graph="sectors"
                        />
                    </article>

                    <article className={styles.expense} >
                        <h3>Despesas</h3>
                        
                        <GraphSubtitle
                            data={userData.expense}
                            colorTheme="red"
                            graph="columns"
                        />
                    </article> 

                    <article className={styles.investment} >
                        <h3>Investimentos</h3>
                        
                        <GraphSubtitle
                            data={userData.investment}
                            colorTheme="green"
                            graph="columns"
                        />
                    </article>

                    <aside className={styles.goal} >
                        <h4>Metas</h4>

                        {!userData.financialGoal[0] === true ? 
                            <div>
                                <p>Não há metas</p>
                                <LinkText
                                    text="Criar nova meta"
                                    to="/home/financial_goal/register"
                                    detach={true}
                                />
                            </div>
                        : 
                            <div>
                                A definir
                            </div>
                        }
                    </aside>

                    <aside className={styles.tips} >
                        {userData.guidance.map(element => element != userData.guidance[0] && 
                        (<section key={element} className={styles.card_tips}>
                            <p>{element}</p>
                        </section>))}
                    </aside>
                </div>
            }
        </>
    );
};