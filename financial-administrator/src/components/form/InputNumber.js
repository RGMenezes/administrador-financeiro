"use client";
import { useState } from "react";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

import styles from "./InputNumber.module.css";

export default function InputNumber({text, id, min, max, placeholder, required}){
    const [value, setValue] = useState(false);


    //fazer uma função usando onChange ou onClick no container em vez do icon, usar target para identificar qual icone clicado.
    const addValue = (e) => {if(value != max || value === false) console.log(e); setValue(e.target.value + 1)};
    const remValue = (e) => {if(value != min || value === false) setValue(e.target.value - 1)};
    return (
        <div className={styles.container}>
            <label htmlFor={id} >{text}</label>
            {required ? 
                <div className={styles.input_container} >
                    <input 
                        type="number" 
                        id={id}
                        name={id} 
                        min={min} 
                        max={max}
                        placeholder={placeholder} 
                        required 
                        defaultValue={value}
                    />
                    <div className={styles.button_container}>
                        <BsFillCaretUpFill onClick={addValue} />
                        <BsFillCaretDownFill onClick={remValue} />
                    </div>
                </div>
            : 
                <div>
                    <input
                        type="number"
                        id={id}
                        name={id}
                        min={min}
                        max={max}
                        placeholder={placeholder}
                    />
                </div>
            }
        </div>
    );
};