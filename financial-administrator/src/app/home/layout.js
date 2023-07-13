"use client";
import { useState } from "react";

import styles from "./layout.module.css"

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function layout({children}){
    const [theme, setTheme] = useState(false);

    return(
        <div className={theme ? `${styles.bg}`: `${styles.bg} ${styles.dark}`}>
            <Header setTheme={setTheme} />

            <main className={styles.main} >
                {children}
            </main>

            <Footer />
        </div>
    );
};