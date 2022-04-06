import styles from "../styles/login_signup.module.css";
import { generate } from "shortid";
import next from "next";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { rootCertificates } from "tls";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const email = useRef(null);
  const password = useRef(null);

  const attemptLogin = async () => {
    fetch("https://dev.createforever.media/api:lSOVAmsS/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then(async function (response) {
        return response.json();
      })
      .then(async function (total) {
        localStorage.setItem("Auth_token", total.authToken);
        return total.authToken;
      })
      .then(async function (auth_token) {
        return fetch("https://dev.createforever.media/api:lSOVAmsS/auth/me", {
          method: "GET",
          headers: { Authorization: "Bearer " + auth_token },
        });
      })
      .then(async function (user_id) {
        return user_id.json();
      })
      .then(async function (final_user_id) {
        localStorage.setItem("User_ID", JSON.stringify(final_user_id.id));
        document.cookie = `User_ID=${JSON.stringify(
          final_user_id.id
        )}; expires=Thu, 18 Dec 2033 12:00:00 UTC`;
        router.push("/");
      });
  };
  
  return (
    <div>
      <div className={styles.top_bar}>
        <div className={styles.navcontainer}>
          <Link href="/login">
            <p className={styles.selected_nav}>Login</p>
          </Link>
          <Link href="/signup">
            <p className={styles.unselected_nav}>Sign Up</p>
          </Link>
        </div>
      </div>

      <h1 className={styles.title}>Welcome Back</h1>

      <div className={styles.inputgroup}>
        <label className={styles.inputlabel}>Email Address</label>
        <input ref={email} type="email" id="email" name="email"></input>
      </div>
      <div className={styles.inputgroup}>
        <label className={styles.inputlabel}>Password</label>
        <input
          ref={password}
          className={styles.inputcreds}
          type="password"
          id="password"
          name="password"
        ></input>
        <button className={styles.loginbutton} onClick={attemptLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
