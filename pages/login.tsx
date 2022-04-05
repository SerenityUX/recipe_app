import styles from "../styles/login_signup.module.css";
import { generate } from "shortid";
import next from "next";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { rootCertificates } from "tls";
import Link from 'next/link';



const Login = () => {

  return (
    <div>
    <div className={styles.top_bar}>
    <div className={styles.navcontainer}>
    <Link href="/login"><p className={styles.selected_nav}>Login</p></Link>
    <Link href="/signup"><p className={styles.unselected_nav}>Sign Up</p></Link>
    </div>
    </div>

    <h1 className={styles.title}>Welcome Back</h1>
    <form>
    <div className={styles.inputgroup}>
    <label className={styles.inputlabel}>Email Address</label>
    <input type="email" id="email" name="email"></input>
    </div>
    <div className={styles.inputgroup}>
    <label className={styles.inputlabel}>Password</label>
    <input className={styles.inputcreds} type="password" id="password" name="password"></input>
    <button className={styles.loginbutton}>Login</button>
    </div>
    </form>
    </div>

    
  );
};

export default Login;
