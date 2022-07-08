import styles from "../styles/landing.module.css";
import next from "next";
import React, { useState, useEffect, useRef } from "react";
import MainThumbnail from "../assets/main_image.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();
  return (
    <div>
      <div className={styles.top_bar}>
        <div className={styles.navcontainer}>
          <div className={styles.left}>
            <Link href="/landing">
              <p className={styles.home_nav}>Meal Pack</p>
            </Link>
          </div>
          <div className={styles.right}>
            <Link href="/login">
              <p className={styles.selected_nav}>Login</p>
            </Link>
            <Link href="/signup">
              <p className={styles.unselected_nav}>Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.contentsectionfirst}>
        <Image src={MainThumbnail} className={styles.majorthumbnail} />
        <h1 className={styles.smallertitle}>
          Empowering Home Chefs to Create, Store, and Share Intimate Recipes
        </h1>
        <p className={styles.paragraph_text}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </p>
        <Link href="/signup">
          <button className={styles.sign_up_button}>Create my Meal Pack</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
