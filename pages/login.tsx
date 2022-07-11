import styles from "../styles/login_signup.module.css";
import { generate } from "shortid";
import next from "next";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { rootCertificates } from "tls";
import Link from "next/link";
import { useRouter } from "next/router";
import requestLogin from "../lib/requestLogin";
import LoginButton from "../components/login_button";
export enum UploadState {
  Default = "Default",
  Uploading = "Uploading",
  Uploaded = "Uploaded",
  Failed = "Failed",
}

const Login = () => {
  const [isUploading, setIsUploading] = useState<UploadState>(
    UploadState.Default
  );

  const router = useRouter();
  const email = useRef(null);
  const password = useRef(null);

  const attemptLogin = async () => {
    let formData = new FormData();
    setIsUploading(UploadState.Uploading);
    const [token, userError] = (await requestLogin({
      email: email.current.value,
      password: password.current.value,
    })) as [any, any];
    if (userError) {
      setIsUploading(UploadState.Failed);
    } else {
      setIsUploading(UploadState.Uploaded);
    }
    if (userError) return alert(userError);

    document.cookie = `token=${token}; expires=Wed, 05 Aug 2035 23:00:00 UTC"`; // fix this, this really bad --Yofou
    router.push("/");
  };
  /*     fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/auth/login", {
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
        document.cookie = `token=${
          total.authToken
        }; expires=Wed, 05 Aug 2035 23:00:00 UTC"`
        return total.authToken;
      })
      router.push("/")
  }; */

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
        <LoginButton
          value={isUploading}
          onClick={() => {
            attemptLogin();
          }}
        />
      </div>
    </div>
  );
};

export default Login;
