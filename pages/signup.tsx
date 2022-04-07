import styles from "../styles/login_signup.module.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import getImage from "../lib/getImage";
import requestSignUp from "../lib/requestSignUp";
import { ChangeEventHandler } from "react"
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter()
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const textArea = useRef<HTMLTextAreaElement>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [phoneInput, setPhoneInput] = useState("")

  const onTextAreaChange = () => {
    const value = textArea.current.value
    textArea.current.style.height = "5px"
    textArea.current.style.height = `${textArea.current.scrollHeight}px`

    setNameInput( value.replaceAll("\n", "") )
  }

  useEffect(() => {
    if (images.length < 1) return;
    const newImagesUrls = [];
    images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImagesUrls);
  }, [images]);

  const handleProfileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setImages(Array.from(event.target.files));
  };

  const attemptSignup = async () => {
    let formData = new FormData();
    formData.append("image_url", images[0]);
    const [image, imageError] = await getImage(formData) 
    if (imageError) return alert("Image API Error - Try again")

    const [token, userError] = await requestSignUp({
      email,
      password,
      phone_number: phoneInput,
      name: nameInput,
      profile_picture: image,
    }) as [any, any]

    if (userError) return alert(userError);

    document.cookie = `token=${token}` // fix this, this really bad --Yofou
    router.push("/")
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
            ></img>{""}
          </div>
          <input
            type="file"
            accept="image/*"
            className={styles.upload_image}
            onChange={handleProfileChange}
          ></input>
        </label>
        <div className={styles.stack}>
          <textarea value={nameInput} ref={textArea} onChange={onTextAreaChange} className={styles.nameInput} placeholder="First and last name" name="" id=""></textarea>
          <input type="tel" placeholder="Phone Number" value={phoneInput} onChange={(event) => setPhoneInput(event.target.value)} className={styles.phoneInput} />
        </div>
      </div>

      {/*Below the user inputs their login details */}
      <div className={styles.inputgroup}>
        <label htmlFor="email" className={styles.inputlabel}>Email Address</label>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" id="email" name="email"></input>
      </div>

      <div className={styles.inputgroup}>
        <label htmlFor="password" className={styles.inputlabel}>Password</label>
        <input
          className={styles.inputcreds}
          value={password}
          onChange={event => setPassword(event.target.value)}
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
