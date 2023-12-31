"use client"
import api from "@/api/axiosApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";

import Loading from "@/components/system/Loader";
import AlertBox from "@/components/system/AlertBox";
import InputText from "@/components/form/InputText";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import InputNumber from "@/components/form/InputNumber";
import LinkText from "@/components/system/LinkText";
import Button from "@/components/form/Button";

export default function DataRegister(){
    const {data: session} = useSession();

    const router = useRouter();

    const [onAlert, setOnAlert] = useState({});
    const [loading, setLoading] = useState(false);

    const [contInvestment, setContInvestment] = useState([]);

    useEffect(() => {
        setContInvestment(["investment_1"]);
    }, []);

    const addInvestment = () => setContInvestment([...contInvestment, `investment_${contInvestment.length + 1}`]);
    const remInvestment = () => contInvestment.length <= 1 ? setContInvestment(["investment_1"]) : setContInvestment(arrayStatePop(contInvestment));
    const arrayStatePop = (array) => {
        let newArray = [];
        for(let item = 0; item < array.length - 1; item++ ) newArray.push(array[item]);
        return newArray;
    };

    function submit(e){
        e.preventDefault();
        setLoading(true);

        const arrayInvestment = contInvestment.map(item => [e.target[`Text_${item}`].value, parseInt(e.target[`Number_${item}`].value)]);

        api.put("register/investment", {id: session.user.id, investments: arrayInvestment}).then((res) => {
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
                <h1>Adicionar Investimento</h1>

                <fieldset className={styles.fieldset} >
                    <legend>Investimento</legend>

                    <section className={styles.amount_container}>
                        <div className={styles.container_x}>
                            <BsArrowLeftCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && remInvestment()} onClick={remInvestment} />
                            <p>{contInvestment.length}</p>
                            <BsArrowRightCircleFill tabIndex="0" className={styles.icon} onKeyDown={(e) => e.key == "Enter" && addInvestment()} onClick={addInvestment} />
                        </div>
                    </section>

                    {contInvestment.map((item) => 
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