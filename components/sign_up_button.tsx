import React, { useState, useEffect, useRef } from "react";
import { UploadState} from "../pages/signup"

type ButtonProps = { onClick: () => void, value: UploadState }
import styles from "../styles/createrecipe.module.css";

const SignupButton: React.FC<ButtonProps> = ({ value, onClick }) => {
    console.log(value)
    return(
    <button onClick={onClick}
    className= {styles[`${value}`]}
        //styles.submit_button
    >
    {value == UploadState.Default && "Sign Up"}
    {value == UploadState.Uploading && "Creating Account"}
    {value == UploadState.Uploaded && "Account Created"}
    {value == UploadState.Failed && "Try Again"}
  </button>)
}

export default SignupButton