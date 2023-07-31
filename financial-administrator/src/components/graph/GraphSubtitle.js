import styles from "./GraphSubtitle.module.css";
import {SiElement} from "react-icons/si"

import GraphSectors from "./GraphSectors"; 
import GraphColumns from "./GraphColumns"; 

export default function Subtitle({data, colorTheme = "blue", graph}){

    const colors = {
        red: ['#FF4D4D', '#FF8080', '#FFB2B2', '#FFD6D6'],
        green: ['#00CC66', '#66FF99', '#B2FFCC', '#E6FFED'],
        blue: ['#0099FF', '#66B2FF', '#B2D6FF', '#E6F2FF'],
        hot: ['#FF0000', '#FF5500', '#FFAA00', '#FFD400'],
        cold: ['#00FFFF', '#66FFFF', '#B2FFFF', '#E6FFFF']
    };

    return(
        <section className={styles.subtitle}>
            {graph == "sectors" && (<GraphSectors data={data} colorTheme={colorTheme} />)} 
            {graph == "columns" && (<GraphColumns data={data} colorTheme={colorTheme} />)} 
            <ul className={styles.list}>
                {data.map((item, index) => (
                    <li className={styles.list_element} key={`${item[0]}_${index}`}>
                        <SiElement
                            className={styles.icon}
                            style={{ color: colors[colorTheme][index % colors[colorTheme].length] }}
                        />
                        <span className={styles.list_text}><strong>{item[0]}</strong><br/>R${item[1]}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};