import navstyles from "../styles/Home.module.css";
import styles from "../styles/grocery-list.module.css";
import Head from "next/head";
import Chip from "../components/chipv2";
import Recipepreview from "../components/recipepreview";
import { motion } from "framer-motion";
// import  props.recipes_list from '../recipes.json'
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import Image from "next/image";
import SearchIcon from "../assets/search.svg";
import navButtonQR from "../assets/QRButton.svg";
import createButton from "../assets/createbutton.svg";
import getSelf from "../lib/getSelf";
import getAllUsers from "../lib/getAllUsers";
import recipe_icon from "../assets/recipesicon_unselected.svg";
import grocery_icon from "../assets/groups.svg";
import groups_icon from "../assets/groups.svg";

const animationvariants = {
  hidden: {
    opacity: 0.01,
  },
  visible: { opacity: 1, x: 0 },
};
const animationvariantsbuttons = {
  hidden: {
    opacity: 0.01,
    scale: 0.0,
  },
  visible: { opacity: 1, scale: 1 },
};

const Groups = () => {
  return (
    <div>
      <div className={navstyles.fixedtopbar}>
        <div className={navstyles.topbar}>
          <h1 className={navstyles.maintitle}>Meal Pack</h1>
        </div>
        <nav className={navstyles.navbar}> 
          <Link href={`/`}>
            <div className={navstyles.navoption}>
            <Image src={recipe_icon} width={24} height={24}></Image>
            <p >Recipes</p>
            </div>
          </Link>
          <Link href={`/grocery_list`}>
            <div className={navstyles.navoption}>
            <Image src={groups_icon} width={24} height={24}></Image>
            <p className={navstyles.selectednav}>Groups</p>
           </div>
          </Link>
          <Link href={`/grocery_list`}> 
            <div className={navstyles.navoption}>
          {/* <img src={props.user.profile_picture.url} className={styles.profile_picture}></img> */}
            <p>Profile</p>
            </div>
          </Link>
        </nav>
      </div>
      <div className={navstyles.spacer}></div>
    </div>
  );
};

export default Groups;
