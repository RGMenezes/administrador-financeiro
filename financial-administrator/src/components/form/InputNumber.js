"use client";
import {BsFillCaretUpFill, BsFillCaretDownFill} from "react-icons/bs"
import { useState } from "react";

import styles from "./InputNumber.module.css";

export default function InputNumber({text, id, min, max, placeholder, required, defaultValue = ''}){

    const [value, setValue] = useState(defaultValue);

    function handleChange(e){
        isNaN(e.target.value) || e.target.value == undefined ? setValue('') : setValue(minMaxValue(parseInt(e.target.value)));

        function minMaxValue(value){
            if(value <= min){
                return min;
            }else if(value >= max){
                return max;
            }else{
                return isNaN(value) ? '' : value;
            };
        };
    };

    const increment = () => isNaN(value) || value === "" || value == undefined ? setValue(1) : value >= max ? setValue(max) : setValue(value + 1);
    const decrement = () => isNaN(value) || value === "" || value == undefined ? setValue(0) : value <= min ? setValue(min) : setValue(value - 1);

    return (
        <div className={styles.container}>
            <label htmlFor={id} >{text}</label>
            <div className={styles.input}>
                {required ?
                    <input
                        type="number"
                        id={id}
                        name={id}
                        min={min}
                        max={max}
                        placeholder={placeholder}
                        required
                        value={value}
                        onChange={handleChange}
                    />
                :
                    <input
                        type="number"
                        id={id}
                        name={id}
                        min={min}
                        max={max}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                    />
                }
                <div className={styles.arrows} >
                    <BsFillCaretUpFill className={styles.up_icon} onClick={increment} />
                    <BsFillCaretDownFill className={styles.down_icon} onClick={decrement} />
                </div>
            </div>
        </div>
    );
};