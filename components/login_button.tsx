import React, { useState, useEffect, useRef } from "react";
import { UploadState} from "../pages/login"

type ButtonProps = { onClick: () => void, value: UploadState }
import styles from "../styles/createrecipe.module.css";

const LoginButton: React.FC<ButtonProps> = ({ value, onClick }) => {
    console.log(value)
    return(
    <button onClick={onClick}
    className= {styles[`${value}`]}
        //styles.submit_button
    >
    {value == UploadState.Default && "Login"}
    {value == UploadState.Uploading && "Checking Credentials"}
    {value == UploadState.Uploaded && "Access Granted"}
    {value == UploadState.Failed && "Try Again"}
  </button>)
}

export default LoginButton