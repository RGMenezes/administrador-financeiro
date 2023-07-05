import "./styles.module.css";

import InputText from "../components/form/InputText"

export default function Page(){
    return (
        <section>
            <InputText
                type="email" 
                text="E-mail"
                placeholder="E-mail"
                id="email"

            />
        </section>
    );
};