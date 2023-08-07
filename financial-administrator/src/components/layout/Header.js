"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import db from "@/api/db";

import { HiMenu, HiLogout, HiSun, HiMoon } from "react-icons/hi";
import {IoClose, IoSettingsSharp} from "react-icons/io5"
import styles from "./Header.module.css";

import Loading from "../system/Loader";
import AlertBox from "../system/AlertBox";

import Logo from "../../../public/logo/logo";
import LinkText from "../system/LinkText";

export default function Header({setTheme}){

    const router = useRouter();
    const [user, setUser] = useState({});

    const [menu, setMenu] = useState("slide_out");

    const [loading, setLoading] = useState(false);
    const [onAlert, setOnAlert] = useState({});

    const [onTheme, setOnTheme] = useState(true);
    const [fadeTheme, setFadeTheme] = useState("fade_out");
    const [fadeThemeDark, setFadeThemeDark] = useState("fade_in");

    useEffect(() => {
        setLoading(true);
        
        db.get("/user").then(res => {
            if(res.data.type === "object"){
                setUser(res.data.data);
                setOnTheme(res.data.data.theme);
                if(res.data.data.theme){
                    setFadeTheme("fade_out");
                    setTimeout(() => {
                        setOnTheme(false);
                        setFadeThemeDark("fade_in");
                    }, 300);
                }else{
                    setFadeThemeDark("fade_out");
                    setTimeout(() => {
                        setOnTheme(true);
                        setFadeTheme("fade_in");
                    }, 300);
                };
            }else{
                setOnAlert(res.data);
                router.push(res.data.redirect);
            };
        }).catch(err => {
            console.log(`Erro ao conectar com o banco de dados: ${err}`);

        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setTheme(onTheme);

        if(user.email){
            db.put("/user/edit/theme", {id: user.id, theme: user.theme}).then((res) => {
                if(res.data.type == "error"){
                    setOnAlert(res.data);
                };
            }).catch(err => console.log(`Erro ao conectar no banco de dados: ${err}`));
        };
    }, [onTheme]);

    function changeTheme(){
        if(onTheme){
            setFadeTheme("fade_out");
            setTimeout(() => {
                setOnTheme(false);
                setFadeThemeDark("fade_in");
            }, 300);
        }else{
            setFadeThemeDark("fade_out");
            setTimeout(() => {
                setOnTheme(true);
                setFadeTheme("fade_in");
            }, 300);
        };
        user.theme = onTheme;
    };

    const menuControl = () => menu == "slide_in" ? setMenu("slide_out") : setMenu("slide_in");
    const menuOf = () => setMenu("slide_out");

    const settings = () => router.push("/home/setting");

    function logout(){
        db.get("/logout").then((res) => {
            setOnAlert(res.data);
            router.push(res.data.redirect);
        }).catch(err => console.log(`Erro ao conectar ao banco de dados: ${err}`));
    };

    return(
        <header className={styles.header_container} >

            {loading && <Loading />}
            <AlertBox alert={onAlert} />

            <Link className={styles.logo} href={"/home"}><Logo /></Link>

            <div tabIndex={0} onFocus={menuControl} onClick={menuControl} className={`${styles.menu_icon} ${styles.icon}`}>
                <HiMenu />
            </div>

            <section onMouseLeave={menuOf} className={`${styles.menu} ${styles[menu]}`} >
                <header>
                    <IoClose tabIndex={0} onKeyDown={(e) => e.key == "Enter" && menuOf()} onClick={menuControl} className={styles.icon} />
                    <h4>Oi {user.name}!</h4>
                </header>
                <nav>
                    <ul>
                        <li><LinkText to="/home/expenses/register" text="Adicionar despesas" spaced={true} /></li>
                        <li><LinkText to="/home/expenses" text="Visualizar despesas" spaced={true} /></li>
                        <li><LinkText to="/home/investment/register" text="Adicionar investimentos" spaced={true} /></li>
                        <li><LinkText to="/home/investment" text="Visualizar investimentos" spaced={true} /></li>
                        <li><LinkText to="/home/financial_goal/register" text="Criar meta financeira" spaced={true} /></li>
                        <li><LinkText to="/home/financial_goal" text="Visualizar metas" spaced={true} /></li>
                        <li><LinkText to="/home/data/edit" text="Atualizar dados" spaced={true} /></li>
                    </ul>
                    <hr/>
                    <ul>
                        <li><LinkText to="/home/financial_report" text="Relatório financeiro" spaced={true} /></li>
                        <li><LinkText to="/home/guidance" text="Orientações" spaced={true} /></li>
                    </ul>
                </nav>
                <footer>
                    <IoSettingsSharp tabIndex={0} onKeyDown={(e) => e.key == "Enter" && settings()} onClick={settings} className={styles.icon} />

                    {onTheme ? 
                        <HiMoon tabIndex={0} onKeyDown={(e) => e.key == "Enter" && changeTheme()} onClick={changeTheme} className={`${styles.icon} ${styles[fadeTheme]}`} /> 
                    : 
                        <HiSun tabIndex={0} onKeyDown={(e) => e.key == "Enter" && changeTheme()} onClick={changeTheme} className={`${styles.icon} ${styles[fadeThemeDark]}`} />
                    }
                    
                    <HiLogout tabIndex={0} onKeyDown={(e) => e.key == "Enter" && logout()} onClick={logout} className={styles.icon} />
                </footer>
            </section>
        </header>
    );
};