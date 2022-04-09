import React, { useState, useEffect, useRef } from "react";
import { CheckState} from "../pages/index"
import styles from '../styles/chip.module.css'

type ButtonProps = { onClick: (
) => void, value: string, checked: boolean}


const Chip: React.FC<ButtonProps> = ({ value, checked, onClick }) => {
    console.log(checked)
    return(
    <div onClick={onClick}
    className= {styles[`${checked}`]}
        //styles.submit_button
    >
    {value}
  </div>)
}

export default Chip