"use client"
import { useState } from "react";
import styles from "./page.module.css";

import Loading from "@/components/system/Loading";
import AlertBox from "@/components/system/AlertBox";
import InputText from "@/components/form/InputText";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import InputNumber from "@/components/form/InputNumber";

export default function Data(){

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [contInvestments, setContInvestments] = useState(["investment_1"]);
    const [contExpenses, setContExpenses] = useState(["expenses_1"]);


    const addInvestments = () => setContInvestments(contInvestments.push(`investment_${contInvestments.length + 1}`));
    const remInvestments = () => contInvestments.length <= 1 ? setContInvestments(["investment_1"]) : setContInvestments(contInvestments.pop());


    function submit(e){
        e.preventDefault();
    };

    return(
        <>
            {loading && <Loading />}
            <AlertBox alert={onAlert} />

            <form onSubmit={submit}>
                <h1>Registrar dados</h1>

                <fieldset>
                    <h2>Investimentos</h2>

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
            </form>
        </>
    );
};