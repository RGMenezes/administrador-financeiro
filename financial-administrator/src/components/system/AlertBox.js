"use client";
import { useEffect, useState } from "react";
import styles from "./AlertBox.module.css";

export default function AlertBox({alert}){

    const [fade, setFade] = useState("");
    const [type, setType] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if(alert.msg){
            setMsg(alert.msg);
            setType(alert.type);
            setFade("fade");
            setTimeout(() => setFade(""), 3000);
        };
    }, [alert]);

    return(
        <div className={`${styles.container} ${styles[type]} ${styles[fade]}`} >
            {msg}
        </div>
    );
};