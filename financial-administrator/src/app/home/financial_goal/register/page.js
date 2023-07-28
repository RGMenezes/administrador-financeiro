'use client';
import db from "@/api/db";
import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import styles from "./page.module.css";

import Loading from "@/components/system/Loading";
import LinkText from "@/components/system/LinkText";
import InputNumber from "@/components/form/InputNumber";
import InputTextArea from "@/components/form/InputTextArea";
import Button from "@/components/form/Button";
import AlertBox from "@/components/system/AlertBox";

export default function FinancialGoalRegister() {
    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const  [goal, setGoal] = useState(["goal_1"]);

    const addGoal = () => setGoal([...goal, `goal_${goal.length + 1}`]);
    const remGoal = () => goal.length <= 1 ? setGoal(["goal_1"]) : setGoal(goal.splice(0, goal.length - 1));

    function submit(e){
        e.preventDefault();
        setLoading(true);

        const arrayGoal = goal.map(item => [e.target[`Text_${item}`].value, parseInt(e.target[`Number_${item}`].value)]);

        db.post("/register/financial_goal", arrayGoal).then((res) => {
            setOnAlert(res.data);
        }).catch(err => console.error(`Erro ao conectar ao banco de dados: ${err}`))
        .finally(() => setLoading(false))
    };

    return(
        <>
            <AlertBox alert={onAlert} />
            {loading && <Loading />}

            <form onSubmit={submit} className={styles.form}>
                <h1>Criar metas</h1>

                <section className={styles.amount_container}>
                    <div className={styles.container_x}>
                        <BsArrowLeftCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && remGoal()} onClick={remGoal} />
                        <p>{goal.length}</p>
                        <BsArrowRightCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && addGoal()} onClick={addGoal} />
                    </div>
                </section>

                <section className={styles.goal_container}>
                    {goal.map((item) =>
                        <div key={item}>
                            <InputTextArea
                                text="Descreva a sua nova meta."
                                id={`Text_${item}`}
                                maxLength={100}
                                minLength={1}
                                rows={5}
                            />
                            <InputNumber
                                text="Valor: "
                                placeholder="Valor da meta"
                                id={`Number_${item}`}
                                min={0}
                                required={true}
                            />
                        </div>
                    )}
                </section>

                <div className={styles.container_x}>
                    <LinkText 
                        text="Voltar ao início"
                        to="/home"
                    />

                    <Button
                        text="Registrar dados"
                        type="submit"
                    />
                </div>
            </form>
        </>
    );
};