"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import Loading from "@/components/system/Loading";
import AlertBox from "@/components/system/AlertBox";
import InputText from "@/components/form/InputText";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import InputNumber from "@/components/form/InputNumber";
import LinkText from "@/components/system/LinkText";
import Button from "@/components/form/Button";

export default function Data(){

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
    const addExpenses = () => setContExpenses([...contExpenses, `investment_${contExpenses.length + 1}`]);
    const remExpenses = () => contExpenses.length <= 1 ? setContExpenses(["investment_1"]) : setContExpenses(arrayStatePop(contExpenses));
    const arrayStatePop = (array) => {
        let newArray = [];
        for(let element = 0; element < array.length - 1; element++ ) newArray.push(array[element]);
        return newArray;
    };

    function submit(e){
        e.preventDefault();

    };

    return(
        <>
            {loading && <Loading />}
            <AlertBox alert={onAlert} />

            <form className={styles.form_container} onSubmit={submit}>
                <h1>Registrar dados</h1>

                <fieldset className={styles.fieldset} >
                    <h2>Investimentos</h2>

                    <legend></legend>

                    <section>
                        <div>
                            <BsArrowLeftCircleFill onClick={remInvestments} />
                            <p>{contInvestments.length}</p>
                            <BsArrowRightCircleFill onClick={addInvestments} />
                        </div>
                    </section>

                    {contInvestments.map((element) => 
                        <div key={element}>
                            <InputText
                                text="Nome"
                                type="text"
                                placeholder="Nome do investimento"
                                id={element}
                                maxLenght={20}
                                required={true}
                            />
                            <InputNumber 
                                text="Valor"
                                placeholder="Valor do investimento"
                                id={element}
                                min={0}
                                required={true}
                            />
                        </div>
                    )}
                </fieldset>

                <fieldset className={styles.fieldset} >
                    <h2>Despesas</h2>

                    <legend></legend>

                    <section>
                        <div>
                            <BsArrowLeftCircleFill onClick={remExpenses} />
                            <p>{contExpenses.length}</p>
                            <BsArrowRightCircleFill onClick={addExpenses} />
                        </div>
                    </section>

                    {contExpenses.map((element) => 
                        <div key={element}>
                            <InputText
                                text="Nome"
                                type="text"
                                placeholder="Nome do investimento"
                                id={element}
                                maxLenght={20}
                                required={true}
                            />
                            <InputNumber 
                                text="Valor"
                                placeholder="Valor do investimento"
                                id={element}
                                min={0}
                                required={true}
                            />
                        </div>
                    )}
                </fieldset>

                <div>
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