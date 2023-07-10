import styles from "./InputText.module.css";

export default function Input({type, text, placeholder, id, minLength, maxLenght, required = false, autoComplete}){

    const rqd = required;

    return(
        <div className={styles.container} >
            <label htmlFor={id}>{text}: </label>
            {rqd ? 
                <input 
                    type={type}
                    id={id} 
                    name={id}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLenght}
                    autoComplete={autoComplete}
                    required
                />
            :   
                <input 
                    type={type}
                    id={id} 
                    name={id}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLenght}
                    autoComplete={autoComplete}
                />
            }
        </div>
    );
};