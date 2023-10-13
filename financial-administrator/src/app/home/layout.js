"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

import styles from "./layout.module.css"

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loader from "@/components/system/Loader";

export default function layout({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        console.log(status, session)
        if (status == "unauthenticated") {
            router.push("/");
        };
    }, [status, router]);

    if(status == "loading"){
        return (
            <div className={theme ? `${styles.bg}` : `${styles.bg} ${styles.dark}`}>
                <Loader />
            </div>
        );
    };
    if(status == "authenticated"){
        return (
            <div className={theme ? `${styles.bg}` : `${styles.bg} ${styles.dark}`}>
                <Header setTheme={setTheme} />
    
                <main className={styles.main} >
                    {children}
                </main>
    
                <Footer />
            </div>
        );
    }
};