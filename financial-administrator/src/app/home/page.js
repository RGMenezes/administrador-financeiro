"use client";
import api from "@/api/axiosApi";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

import styles from "./page.module.css";

import Loading from "@/components/system/Loader";
import AlertBox from "@/components/system/AlertBox";
import LinkText from "@/components/system/LinkText";
import GraphSubtitle from "@/components/graph/GraphSubtitle";

export default function Home() {
    const { data: session } = useSession();

    const [loading, setLoading] = useState(false);
    const [onAlert, setOnAlert] = useState({});

    const [userData, setUserData] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setLoading(true);

        api.post("/user", session.user).then((res) => {
            setUser(res.data.data);
        }).catch((err) => console.log(`Não foi possivel acessar o banco de dados: ${err}`))
            .finally(() => setLoading(false));

        api.post("/data", session.user).then((res) => {
            setUserData(res.data.data);
        }).catch((err) => console.log(`Não foi possivel acessar o banco de dados: ${err}`))
            .finally(() => setLoading(false));
    }, [user, userData]);

    const totalDataUser = (arrayData) => arrayData.map(item => item = item[1]).reduce((acc, cur) => acc + cur, 0);

    return (
        <>
            {loading && <Loading />}
            <AlertBox alert={onAlert} />
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
                        <div className={styles.summary_profile}>
                            <h2>{user.name}</h2>
                            <ul>
                                <li><strong>Salário: R${user.wage}</strong></li>
                                <li>Investimentos: R${`${totalDataUser(userData.investment)}`}</li>
                                <li>Despesas: R${`${totalDataUser(userData.expense)}`}</li>
                            </ul>
                        </div>

                        <div className={styles.graph}>
                            <GraphSubtitle
                                data={[["Investimentos", totalDataUser(userData.investment)], ["Despesas", totalDataUser(userData.expense)]]}
                                graph="sectors"
                            />
                        </div>
                    </article>

                    <section className={styles.goal} >
                        <h4>Metas</h4>

                        {!userData.financialGoal[0] === true ?
                            <div className={styles.container_goal_register}>
                                <p>Não há metas</p>
                                <LinkText
                                    text="Criar nova meta"
                                    to="/home/financial_goal/register"
                                    detach={true}
                                />
                            </div>
                            :
                            <div className={styles.row_x}>
                                {userData.financialGoal.map((item, index) => (
                                    <aside key={`${item[0]}_${index}`} className={styles.card_goal}>
                                        <p>
                                            {item[0]}
                                        </p>
                                        <p>
                                            <strong>R${item[1]}</strong>
                                        </p>
                                    </aside>
                                ))}
                            </div>
                        }
                    </section>

                    <section className={styles.financial}>
                        <article className={styles.expense} >
                            <h3>Despesas</h3>

                            <div className={styles.graph}>
                                <GraphSubtitle
                                    data={userData.expense}
                                    colorTheme="red"
                                    graph="sectors"
                                />
                            </div>
                        </article>

                        <article className={styles.investment} >
                            <h3>Investimentos</h3>

                            <div className={styles.graph}>
                                <GraphSubtitle
                                    data={userData.investment}
                                    colorTheme="green"
                                    graph="sectors"
                                />
                            </div>
                        </article>
                    </section>

                    <section className={styles.tips} >
                        <h4>Dicas</h4>

                        <div className={styles.row_x}>
                            {userData.financialReport.tips.map(item => (
                                <aside key={item} className={styles.card_tips}>
                                    <p>{item}</p>
                                </aside>
                            ))}
                        </div>
                    </section>
                </div>
            }
        </>
    );
};