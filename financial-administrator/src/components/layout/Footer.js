import { BsArchive, BsArchiveFill, BsGithub, BsLinkedin, BsPersonWorkspace } from "react-icons/bs";
import styles from "./Footer.module.css";

export default function Footer(){
    return(
        <footer className={styles.footer} >
            <nav className={styles.container}>
                <a href="https://www.linkedin.com/in/rgmenezes" target="_blank" rel="external" className={styles.icon_container}>
                    <BsLinkedin className={styles.icon} />
                    <p>Rafael Menezes</p>
                </a>
                <a href="https://github.com/RGMenezes" target="_blank" rel="external" className={styles.icon_container}>
                    <BsGithub className={styles.icon} />
                    <p>RGMenezes</p>
                </a>
                <a href="https://github.com/RGMenezes/api-administrador-financeiro" target="_blank" rel="external" className={styles.icon_container}>
                    <BsArchiveFill className={styles.icon} />
                    <p>Repositório back</p>
                </a>
                <a href="https://github.com/RGMenezes/administrador-financeiro" target="_blank" rel="external" className={styles.icon_container}>
                    <BsArchive className={styles.icon} />
                    <p>Repositório front</p>
                </a>
                <a href="https://RGMenezes.github.io/portfolio" target="_blank" rel="external" className={styles.icon_container}>
                    <BsPersonWorkspace className={styles.icon} />
                    <p>Portfolio</p>
                </a>
            </nav>

            <p>Administrador financeiro &copy; 2023</p>
        </footer>
    );
};