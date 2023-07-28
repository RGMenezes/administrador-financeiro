import styles from "./InputText.module.css";

export default function Input({type, text, placeholder, id, minLength, maxLength, required = false, autoComplete}){
    return(
        <div className={styles.container} >
            <label htmlFor={id}>{text}: </label>
            {required ? 
                <input 
                    type={type}
                    id={id} 
                    name={id}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
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
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                />
            }
        </div>
    );
};