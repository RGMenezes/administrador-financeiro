"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./LinkText.module.css";

export default function LinkText({to, text, type = false, spaced = false, detach = false}){
    const router = useRouter();

    const [onType, setOnType] = useState(type);
    const [onSpaced, setOnSpaced] = useState(spaced);
    const [onDetach, setOnDetach] = useState(detach);

    useEffect(() => {
        if(type){ setOnType(type) };
        if(spaced){ setOnSpaced("link_spaced") };
        if(detach){ setOnDetach("detach") };
    }, []);

    const goTo = () => router[onType]();
    
    return(
        <>{onType ? 
            <a onClick={goTo} className={`${styles.link} ${styles[onDetach]} ${styles[onSpaced]}`}>{text}</a>
        :
            <Link className={`${styles.link} ${styles[onDetach]} ${styles[onSpaced]}`} href={to}>{text}</Link>
        }</>

    );
};