import Link from "next/link";
import { HiMenu, HiLogout, HiSun, HiMoon } from "react-icons/hi";
import {IoClose, IoSettingsSharp} from "react-icons/io5"
import styles from "./Header.module.css";

import Logo from "../../../public/logo/logo";
import LinkText from "../system/LinkText";

export default function Header(){
    return(
        <header className={styles.header_container} >
            <div className={styles.logo}>
                <Link href={"/home"}><Logo /></Link>
            </div>

            <div className={styles.menu_icon}>
                <HiMenu />
            </div>

            <section className={styles.menu} >
                <header>
                    <IoClose className={styles.icon} />
                    <h4>Oi Rafael!</h4>
                </header>
                <nav>
                    <ul>
                        <li><LinkText to="/home/expenses/add" text="Adicionar despesas" spaced={true} /></li>
                        <li><LinkText to="/home/expenses" text="Visualizar despesas" spaced={true} /></li>
                        <li><LinkText to="/home/financial_goal/add" text="Criar meta financeira" spaced={true} /></li>
                        <li><LinkText to="/home/financial_goal" text="Visualizar metas" spaced={true} /></li>
                        <li><LinkText to="/home/data/edit" text="Atualizar dados" spaced={true} /></li>
                    </ul>
                    <ul>
                        <li><LinkText to="/home/financial_report" text="Relatório financeiro" spaced={true} /></li>
                        <li><LinkText to="/home/guidance" text="Orientações" spaced={true} /></li>
                    </ul>
                </nav>
                <footer>
                    <IoSettingsSharp className={styles.icon} />

                    <HiSun className={styles.icon} />
                    <HiMoon className={styles.icon} />
                    
                    <HiLogout className={styles.icon} />
                </footer>
            </section>
        </header>
    );
};