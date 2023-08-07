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

    const [contExpenses, setContExpenses] = useState([]);

    useEffect(() => {
        setContExpenses(["expenses_1"]);
    }, []);

    const addExpenses = () => setContExpenses([...contExpenses, `expenses_${contExpenses.length + 1}`]);
    const remExpenses = () => contExpenses.length <= 1 ? setContExpenses(["expenses_1"]) : setContExpenses(arrayStatePop(contExpenses));
    const arrayStatePop = (array) => {
        let newArray = [];
        for(let item = 0; item < array.length - 1; item++ ) newArray.push(array[item]);
        return newArray;
    };

    function submit(e){
        e.preventDefault();
        setLoading(true);

        const arrayExpenses = contExpenses.map(item => [e.target[`Text_${item}`].value, parseInt(e.target[`Number_${item}`].value)]);

        db.put("/register/expense", arrayExpenses).then((res) => {
            setOnAlert(res.data);
            if(res.data.type == "success"){
                router.back();
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
                <h1>Adicionar despesas</h1>

                <fieldset className={styles.fieldset} >
                    <legend>Despesas</legend>

                    <section className={styles.amount_container}>
                        <div className={styles.container_x}>
                            <BsArrowLeftCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && remExpenses()} onClick={remExpenses} />
                            <p>{contExpenses.length}</p>
                            <BsArrowRightCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && addExpenses()} onClick={addExpenses} />
                        </div>
                    </section>

                    {contExpenses.map((item) => 
                        <div className={styles.data_container} key={item}>
                            <InputText
                                text="Nome"
                                type="text"
                                placeholder="Nome da despesa"
                                id={`Text_${item}`}
                                maxLenght={20}
                                required={true}
                            />
                            <InputNumber 
                                text="Valor"
                                placeholder="Valor da despesa"
                                id={`Number_${item}`}
                                min={0}
                                required={true}
                            />
                        </div>
                    )}
                </fieldset>

                <div className={styles.container_x}>
                    <LinkText 
                        text="Voltar"
                        type="back"
                    />

                    <Button
                        text="Adicionar"
                        type="submit"
                    />
                </div>
            </form>
        </>
    );
};