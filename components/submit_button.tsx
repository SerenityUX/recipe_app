import React, { useState, useEffect, useRef } from "react";
import { UploadState} from "../pages/create_recipe/[form]"

type ButtonProps = { onClick: () => void, value: UploadState }
import styles from "../styles/createrecipe.module.css";

const SubmitButton: React.FC<ButtonProps> = ({ value, onClick }) => {
    console.log(value)
    return(
    <button onClick={onClick}
    className= {styles[`${value}`]}
        //styles.submit_button
    >
    {value == UploadState.Default && "Submit"}
    {value == UploadState.Uploading && "Submitting"}
    {value == UploadState.Uploaded && "Submitted"}
    {value == UploadState.Failed && "Try Again"}
  </button>)
}

export default SubmitButton