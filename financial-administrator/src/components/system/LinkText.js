import Link from "next/link";
import styles from "./LinkText.module.css";

export default function LinkText({to = "/", text, spaced = false, detach = false}){
    return(
        <>
            {detach ? 
                <>
                    {spaced ? 
                        <Link className={`${styles.link} ${styles.detach} ${styles.link_spaced}`} href={to}>{text}</Link>
                    :
                        <Link className={`${styles.link} ${styles.detach}`}  href={to}>{text}</Link>
                    }
                </>
            :
                <>
                    {spaced ? 
                        <Link className={`${styles.link} ${styles.link_spaced}`} href={to}>{text}</Link>
                    :
                        <Link className={styles.link}  href={to}>{text}</Link>
                    }
                </>
            }
        </>
    );
};