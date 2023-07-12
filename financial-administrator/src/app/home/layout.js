import styles from "./layout.module.css"

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function layout({children}){
    return(
        <div className={styles.bg}>
            <Header />

            <main className={styles.main} >
                {children}
            </main>

            <Footer />
        </div>
    );
};