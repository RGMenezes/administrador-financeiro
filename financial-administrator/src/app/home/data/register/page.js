"use client"
import db from "@/api/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import Loading from "@/components/system/Loading";
import AlertBox from "@/components/system/AlertBox";
import InputText from "@/components/form/InputText";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import InputNumber from "@/components/form/InputNumber";
import LinkText from "@/components/system/LinkText";
import Button from "@/components/form/Button";

export default function DataRegister(){

    const router = useRouter()

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [contInvestments, setContInvestments] = useState([]);
    const [contExpenses, setContExpenses] = useState([]);

    useEffect(() => {
        setContInvestments(["investment_1"]);
        setContExpenses(["expenses_1"]);
    }, []);


    const addInvestments = () => setContInvestments([...contInvestments, `investment_${contInvestments.length + 1}`]);
    const remInvestments = () => contInvestments.length <= 1 ? setContInvestments(["investment_1"]) : setContInvestments(arrayStatePop(contInvestments));
    const addExpenses = () => setContExpenses([...contExpenses, `expenses_${contExpenses.length + 1}`]);
    const remExpenses = () => contExpenses.length <= 1 ? setContExpenses(["expenses_1"]) : setContExpenses(arrayStatePop(contExpenses));
    const arrayStatePop = (array) => {
        let newArray = [];
        for(let element = 0; element < array.length - 1; element++ ) newArray.push(array[element]);
        return newArray;
    };

    function submit(e){
        e.preventDefault();
        setLoading(true);

        const arrayInvestments = contInvestments.map(element => [e.target[`Text_${element}`].value, parseInt(e.target[`Number_${element}`].value)]);
        const arrayExpenses = contExpenses.map(element => [e.target[`Text_${element}`].value, parseInt(e.target[`Number_${element}`].value)]);

        db.post("register/data", {investment: arrayInvestments, expense: arrayExpenses}).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                router.push(res.data.redirect);
            };
        })
        .catch(err => console.log(`Erro ao conectar ao banco de dados: ${err}`))
        .finally(() => setLoading(false));

    };

    return(
        <>
            {loading && <Loading />}
            <AlertBox alert={onAlert} />

            <form className={styles.form_container} onSubmit={submit}>
                <h1>Registrar dados</h1>

                <fieldset className={styles.fieldset} >
                    <legend>Investimentos</legend>

                    <section className={styles.amount_container}>
                        <div className={styles.container_x}>
                            <BsArrowLeftCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && remInvestments()} onClick={remInvestments} />
                            <p>{contInvestments.length}</p>
                            <BsArrowRightCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && addInvestments()} onClick={addInvestments} />
                        </div>
                    </section>

                    {contInvestments.map((element) => 
                        <div className={styles.data_container} key={element}>
                            <InputText
                                text="Nome"
                                type="text"
                                placeholder="Nome do investimento"
                                id={`Text_${element}`}
                                maxLenght={20}
                                required={true}
                            />
                            <InputNumber 
                                text="Valor"
                                placeholder="Valor do investimento"
                                id={`Number_${element}`}
                                min={0}
                                required={true}
                            />
                        </div>
                    )}
                </fieldset>

                <fieldset className={styles.fieldset} >
                    <legend>Despesas</legend>

                    <section className={styles.amount_container}>
                        <div className={styles.container_x}>
                            <BsArrowLeftCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && remExpenses()} onClick={remExpenses} />
                            <p>{contExpenses.length}</p>
                            <BsArrowRightCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && addExpenses()} onClick={addExpenses} />
                        </div>
                    </section>

                    {contExpenses.map((element) => 
                        <div className={styles.data_container} key={element}>
                            <InputText
                                text="Nome"
                                type="text"
                                placeholder="Nome do investimento"
                                id={`Text_${element}`}
                                maxLenght={20}
                                required={true}
                            />
                            <InputNumber 
                                text="Valor"
                                placeholder="Valor do investimento"
                                id={`Number_${element}`}
                                min={0}
                                required={true}
                            />
                        </div>
                    )}
                </fieldset>

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