import styles from "./Loading.module.css";

import Logo from "../../../public/logo/logo";

export default function Loading(){
    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo />
            </div>
        </div>
    );
};