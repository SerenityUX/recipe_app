import styles from "../styles/login_signup.module.css";
import { generate } from "shortid";
import next from "next";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { rootCertificates } from "tls";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const email = useRef(null);
  const password = useRef(null);
  const nameInput = useRef(null);
  const phoneInput = useRef(null);

  useEffect(() => {
    // console.log(images);
    if (images.length < 1) return;
    const newImagesUrls = [];
    images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImagesUrls);
  }, [images]);

  const handleProfileChange = (event) => {
    console.log(event.target.files[0]);

    // console.log(event.target.files[0]);
    setImages([...event.target.files]);
  };

  const attemptSignup = async () => {
    console.log("clicked button");
    let formData = new FormData();
    formData.append("image_url", images[0]);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      const res = await axios.post(
        "https://dev.createforever.media/api:lSOVAmsS/upload/image",
        formData,
        config
      );
      const res2 = await fetch(
        "https://dev.createforever.media/api:lSOVAmsS/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            phone_number: phoneInput.current.innerText,
            name: nameInput.current.innerText,
            profile_picture: res.data.image,
          }),
        }
      );
      const data = await res2.json();
      localStorage.setItem("Auth_token", data.authToken);
      document.cookie = `User_ID=${JSON.stringify(data.authToken)};`;

      const loginResult = await fetch(
        "https://dev.createforever.media/api:lSOVAmsS/auth/me",
        {
          method: "GET",
          headers: { Authorization: "Bearer " + data.auth_token },
        }
      );
      const loginData = await loginResult.json();

      localStorage.setItem("User_ID", JSON.stringify(loginData.id));
      document.cookie = `User_ID=${JSON.stringify(
        loginData.id
      )}; expires=Thu, 18 Dec 2033 12:00:00 UTC`;
      if (typeof loginData.id !== "undefined") {
        document.cookie = `User_ID=${JSON.stringify(
          loginData.id
        )}; expires=Thu, 18 Dec 2033 12:00:00 UTC`;
        router.push("/");
      } else {
        alert(
          "Please include a valid profile picture, name, phone number, email address, and pasword."
        );
      }
    } catch (error) {
      alert(
        "Please include a valid profile picture, name, phone number, email address, and pasword."
      );
      console.log(error);
    }
  };
  return (
    <div>
      <div className={styles.top_bar}>
        <div className={styles.navcontainer}>
          <Link href="/login">
            <p className={styles.unselected_nav}>Login</p>
          </Link>
          <Link href="/signup">
            <p className={styles.selected_nav}>Sign Up</p>
          </Link>
        </div>
      </div>

      <h1 className={styles.title}>Create a new account</h1>

      {/*Below the user inputs their profile details */}

      <div className={styles.profile}>
        <label className={styles.profile}>
          <div className={styles.upload_container}>
            <img src={imageURLs[0]} className={styles.profile_preview} />
            <img
              src="https://i.ibb.co/TRYVf5F/icon.png"
              className={styles.upload_button}
            ></img>{" "}
          </div>
          <input
            type="file"
            accept="image/*"
            className={styles.upload_image}
            onChange={handleProfileChange}
          ></input>
        </label>
        <div className={styles.stack}>
          <span
            contentEditable
            className={styles.nameInput}
            ref={nameInput}
          ></span>
          <span
            contentEditable
            className={styles.phoneInput}
            ref={phoneInput}
          ></span>
        </div>
      </div>

      {/*Below the user inputs their login details */}
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
        <button
          className={styles.loginbutton}
          onClick={() => {
            attemptSignup();
          }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
