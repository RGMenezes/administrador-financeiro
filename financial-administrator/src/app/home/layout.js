"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

import styles from "./layout.module.css"

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function layout({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        console.log(status)
        if (status == "unauthenticated") {
            router.push("/");
        };
    }, [status, router]);

    return (
        <div className={theme ? `${styles.bg}` : `${styles.bg} ${styles.dark}`}>
            <Header setTheme={setTheme} />

            <main className={styles.main} >
                {children}
            </main>

            <Footer />
        </div>
    );
};