import styles from "./Loader.module.css";

import Logo from "../../../public/logo/logo";

export default function Loader(){
    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo />
            </div>
        </div>
    );
};