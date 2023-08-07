"use client"
import db from "@/api/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import Loading from "@/components/system/Loader";
import AlertBox from "@/components/system/AlertBox";
import InputText from "@/components/form/InputText";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import InputNumber from "@/components/form/InputNumber";
import LinkText from "@/components/system/LinkText";
import Button from "@/components/form/Button";

export default function DataRegister(){
    const router = useRouter();

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [contInvestments, setContInvestments] = useState([]);
    const [contExpenses, setContExpenses] = useState([]);
    const [investments, setInvestments] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const addInvestments = () => setContInvestments([...contInvestments, `investment_${contInvestments.length + 1}`]);
    const remInvestments = () => contInvestments.length <= 1 ? setContInvestments(["investment_1"]) : setContInvestments(arrayStatePop(contInvestments));
    const addExpenses = () => setContExpenses([...contExpenses, `expenses_${contExpenses.length + 1}`]);
    const remExpenses = () => contExpenses.length <= 1 ? setContExpenses(["expenses_1"]) : setContExpenses(arrayStatePop(contExpenses));
    const arrayStatePop = (array) => {
        let newArray = [];
        for(let item = 0; item < array.length - 1; item++ ) newArray.push(array[item]);
        return newArray;
    };

    useEffect(() => {
        setLoading(true);

        db.get("/data").then((res) => {
            const userData = res.data.data;
            setInvestments(userData.investment);
            setExpenses(userData.expense);

            const contArrayInvestment = [];
            userData.investment.forEach((item, index) => contArrayInvestment.push(`investment_${index + 1}`));
            setContInvestments(contArrayInvestment);

            const contArrayExpenses = [];
            userData.expense.forEach((item, index) => contArrayExpenses.push(`expense_${index + 1}`));
            setContExpenses(contArrayExpenses);

        }).catch((err) => console.log(`Não foi possivel acessar o banco de dados: ${err}`))
        .finally(() => setLoading(false));
    }, []);

    function reset(){
        const contArrayInvestment = [];
        investments.forEach((item, index) => contArrayInvestment.push(`investment_${index + 1}`));
        setContInvestments(contArrayInvestment);

        const contArrayExpenses = [];
        expenses.forEach((item, index) => contArrayExpenses.push(`expense_${index + 1}`));
        setContExpenses(contArrayExpenses);
    };

    function submit(e){
        e.preventDefault();
        setLoading(true);

        const arrayInvestments = contInvestments.map(item => [e.target[`Text_${item}`].value, parseInt(e.target[`Number_${item}`].value)]);
        const arrayExpenses = contExpenses.map(item => [e.target[`Text_${item}`].value, parseInt(e.target[`Number_${item}`].value)]);

        db.put("/edit/data", {investment: arrayInvestments, expense: arrayExpenses}).then((res) => {
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
                <h1>Editar dados</h1>

                <fieldset className={styles.fieldset} >
                    <legend>Investimentos</legend>

                    <section className={styles.amount_container}>
                        <div className={styles.container_x}>
                            <BsArrowLeftCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && remInvestments()} onClick={remInvestments} />
                            <p>{contInvestments.length}</p>
                            <BsArrowRightCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && addInvestments()} onClick={addInvestments} />
                        </div>
                    </section>

                    {contInvestments.map((item, index) => 
                        <div className={styles.data_container} key={item}>
                            <InputText
                                text="Nome"
                                type="text"
                                placeholder="Nome do investimento"
                                id={`Text_${item}`}
                                maxLenght={20}
                                defaultValue={investments[index] ? investments[index][0] : ""}
                                required={true}
                            />
                            <InputNumber 
                                text="Valor"
                                placeholder="Valor do investimento"
                                id={`Number_${item}`}
                                min={0}
                                defaultValue={investments[index] ? investments[index][1] : ""}
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

                    {contExpenses.map((item, index) => 
                        <div className={styles.data_container} key={item}>
                            <InputText
                                text="Nome"
                                type="text"
                                placeholder="Nome da despesa"
                                id={`Text_${item}`}
                                maxLenght={20}
                                defaultValue={expenses[index] ? expenses[index][0] : ""}
                                required={true}
                            />
                            <InputNumber 
                                text="Valor"
                                placeholder="Valor da despesa"
                                id={`Number_${item}`}
                                min={0}
                                defaultValue={expenses[index] ? expenses[index][1] : ""}
                                required={true}
                            />
                        </div>
                    )}
                </fieldset>

                <div className={styles.container_x}>
                    <Button
                        text="Reiniciar"
                        type="button"
                        handleClick={reset}
                    />

                    <LinkText 
                        text="Voltar"
                        to="/home"
                    />

                    <Button
                        text="Salvar"
                        type="submit"
                    />
                </div>
            </form>
        </>
    );
};