import React, { useState, useEffect, useRef } from "react";
import { UploadState} from "../pages/create_recipe/[form]"

type ButtonProps = { onClick: () => void, value: UploadState }
import styles from "../styles/createrecipe.module.css";

const SubmitButton: React.FC<ButtonProps> = ({ value, onClick }) => {
    return(
    <button onClick={onClick}
    className={styles.submit_button}>
    {value == UploadState.Default && "Upload"}
    {value == UploadState.Uploading && "Uploading"}
    {value == UploadState.Uploaded && "Uploaded"}
    {value == UploadState.Failed && "Failed"}
  </button>)
}

export default SubmitButton