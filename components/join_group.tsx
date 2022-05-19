import React, { useState, useEffect, useRef } from "react";
import { JoinState} from "../pages/group_page/[id]"

type ButtonProps = { onClick: () => void, value: JoinState }
import styles from "../styles/cook_group.module.css";

const JoinButton: React.FC<ButtonProps> = ({ value, onClick }) => {
    console.log(value)
    return(
    <button onClick={onClick}
    className= {styles[`${value}`]}
        //styles.submit_button
    >
    {value == JoinState.Default && "Join Group"}
    {value == JoinState.Joining && "Joining"}
    {value == JoinState.Joined && "Joined"}
    {value == JoinState.Failed && "Failed"}
  </button>)
}

export default JoinButton