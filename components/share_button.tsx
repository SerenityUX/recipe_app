import React, { useState, useEffect, useRef } from "react";
import { ShareState} from "../pages/recipe_page/[id]"

type ButtonProps = { onClick: () => void, value: string }
import styles from "../styles/recipeview.module.css";

const ShareButton: React.FC<ButtonProps> = ({ value, onClick }) => {
    console.log(value)
    return(
    <button onClick={onClick}
    className= {styles[`${value}`]}
        //styles.submit_button
    >
    {value == ShareState.Default && "Gift Recipe"}
    {value == ShareState.Gifting && "Gifting"}
    {value == ShareState.Gifted && "Gifted"}
    {value == ShareState.Failed && "Try Again"}
  </button>)
}

export default ShareButton