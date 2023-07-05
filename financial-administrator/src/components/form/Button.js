import styles from "./Button.module.css";

export default function Button({text, type = "button", handleClick}){
    return(
        <button className={styles.button} onClick={handleClick} type={type}>
            {text}
        </button>
    );
};