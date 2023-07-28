import styles from "./InputTextArea.module.css";

export default function TextArea({text, maxLength, minLength, id, rows = 1}) {
    return(
        <textarea
            className={styles.textarea}
            id={id}
            name={id}
            minLength={minLength}
            maxLength={maxLength}
            rows={rows}
            required
        >
            {text}
        </textarea>
    );
};