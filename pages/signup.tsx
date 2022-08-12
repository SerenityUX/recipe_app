import styles from "../styles/login_signup.module.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import getImage from "../lib/getImage";
import requestSignUp from "../lib/requestSignUp";
import { ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import SignupButton from "../components/sign_up_button";

export enum UploadState {
  Default = "Default",
  Uploading = "Uploading",
  Uploaded = "Uploaded",
  Failed = "Failed"
}

const Signup = () => {
  const [isUploading, setIsUploading] = useState<UploadState>(UploadState.Default)

  const router = useRouter();
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const textArea = useRef<HTMLTextAreaElement>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");


  const onTextAreaChange = () => {
    const value = textArea.current.value;
    textArea.current.style.height = "5px";
    textArea.current.style.height = `${textArea.current.scrollHeight}px`;

    setNameInput(value.replaceAll("\n", ""));
  };

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
    setIsUploading( UploadState.Uploading )
    let formData = new FormData();
    formData.append("image_url", images[0]);
    const [image, imageError] = await getImage(formData);
    if (imageError) {
      setIsUploading( UploadState.Failed )
    }
    if (imageError) return alert("Error - Missing Profile Picture. Upload a profile picture and try again");
    
    const [token, userError] = (await requestSignUp({
      email,
      password,
      phone_number: phoneInput,
      name: nameInput,
      profile_picture: image,
    })) as [any, any];
    if (userError) {
      setIsUploading( UploadState.Failed )
    } else {
      setIsUploading( UploadState.Uploaded )
    }
    if (userError) return alert(userError);

    document.cookie = `token=${token}; expires=Wed, 05 Aug 2035 23:00:00 UTC"`; // fix this, this really bad --Yofou
    router.push("/");
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

      <h1 className={styles.title}>Create Your Meal Pack</h1>
      {/*Below the user inputs their profile details */}

      <div className={styles.profile}>
        <label className={styles.profile}>
          <div className={styles.upload_container}>
            <img src={imageURLs[0]} className={styles.profile_preview} />
            <img
              src="https://i.ibb.co/TRYVf5F/icon.png"
              className={styles.upload_button}
            ></img>
            {""}
          </div>
          <input
            type="file"
            accept="image/*"
            className={styles.upload_image}
            onChange={handleProfileChange}
          ></input>
        </label>
        <div className={styles.stack}>
          <textarea
            value={nameInput}
            ref={textArea}
            onChange={onTextAreaChange}
            className={styles.nameInput}
            placeholder="First and last name"
            name=""
            id=""
          ></textarea>
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            value={phoneInput}
            onChange={(event) => setPhoneInput(event.target.value)}
            className={styles.phoneInput}
          />
        </div>
      </div>

      {/*Below the user inputs their login details */}
      <div className={styles.inputgroup}>
        <label htmlFor="email" className={styles.inputlabel}>
          Email Address
        </label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="email"
          name="email"
        ></input>
      </div>

      <div className={styles.inputgroup}>
        <label htmlFor="password" className={styles.inputlabel}>
          Password
        </label>
        <input
          className={styles.inputcreds}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setIsUploading( UploadState.Default )}}
          type="password"
          id="password"
          name="password"
        ></input>
        

                <SignupButton value={isUploading} 
            onClick={() => {
              attemptSignup();
            }}
        />
        <div className={styles.bottomtextholder}>
        <text className={styles.bottomtext}>By clicking Sign Up you agree to our <a className={styles.terms} href="https://mealpack-terms.superhi.com">Terms And Conditions</a>.</text>
        </div>
      </div>
    </div>
  );
};

export default Signup;
