import styles from "../styles/login_signup.module.css";
import { generate } from "shortid";
import next from "next";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { rootCertificates } from "tls";
import Link from 'next/link';




  
const Signup = () => {

    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    
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

      
  return (
      
    <div>
    <div className={styles.top_bar}>
    <div className={styles.navcontainer}>
    <Link href="/login"><p className={styles.unselected_nav}>Login</p></Link>
    <Link href="/signup"><p className={styles.selected_nav}>Sign Up</p></Link>
    </div>
    </div>

    <h1 className={styles.title}>Create a new account</h1>
    <form>
    {/*Below the user inputs their profile details */}

    <div className={styles.profile}>
        <label className={styles.profile}>
          <div className={styles.upload_container}>
            <img src={imageURLs[0]} className={styles.profile_preview} />
            <img src="https://i.ibb.co/TRYVf5F/icon.png" className={styles.upload_button}></img>{" "}
          </div>
          <input
            type="file"
            accept="image/*"
            className={styles.upload_image}
            onChange={handleProfileChange}
          ></input>
        </label>
        <div className={styles.stack}>
        <span contentEditable className={styles.nameInput}></span>
        <span contentEditable className={styles.phoneInput}></span>
        </div>
    </div>

    {/*Below the user inputs their login details */}
    <div>
    <div className={styles.inputgroup}>
    <label className={styles.inputlabel}>Email Address</label>
    <input type="email" id="email" name="email"></input>
    </div>
    <div className={styles.inputgroup}>
    <label className={styles.inputlabel}>Password</label>
    <input className={styles.inputcreds} type="password" id="password" name="password"></input>
    <button className={styles.loginbutton}>Sign Up</button>
    </div>
    </div>
    </form>
    </div>

    
  );
};

export default Signup;
