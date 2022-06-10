//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router";
//import list_of_recipes from "../../recipes.json";
import Image from "next/image";
import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";
import getSelf from "../../lib/getSelf";
import { motion } from "framer-motion";
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import styles from "../../styles/cook_group.module.css";
import backButton from "../../assets/back.svg"
import expand from "../../assets/expand.svg"
import collapse from "../../assets/contract.svg"

import JoinButton from '../../components/join_group'

import Marquee from "react-fast-marquee";

export enum JoinState {
  Default = "Default",
  Joining = "Joining",
  Joined = "Joined",
  Failed = "Failed"
}


export async function getServerSideProps(context) {
  const token = context.req?.cookies?.token;

  if (!token)
    return {
      redirection: {
        destination: "/login",
        permanent: false,
      },
    };

  const user = await getSelf(token);

  const { id } = context.params;

  const user_response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/users"
  );

  const user_list = await user_response.json();



  const response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/groups/" + id,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const selected_group = await response.json();
  //console.log(selected_recipe)
  return {
    props: {
      selected_group,
      id, token,
    }, // will be passed to the page component as props
  };
}



//Start of recipe page component
export default function Group(props) {


   const [benefitsopen, setBenefitsOpen] = useState([]);
  console.log(props.selected_group.group_leader_info[0].profile_picture?.url);
  const router = useRouter();
  const [isJoinState, setIsJoin] = useState<JoinState>(JoinState.Default)
      const join_group = async (idspecial, tokenspecial) => {
         console.log("wow")
         setIsJoin( JoinState.Joining )
         fetch("https://dev.createforever.media/api:lSOVAmsS/join/" + idspecial, {
            method: "POST",
            headers: {
              "Content-Type": "application/JSON",
              Authorization: `Bearer ${tokenspecial}`,
            },
            body: JSON.stringify({
              groups_id: idspecial 
            }),
          }).then((response) => 
             {console.log(response)
             if (response.status == 200) {
               setIsJoin( JoinState.Joined )
             }}
         )}
      
  return (
    <div>
          <div className={styles.top_bar}>
          <a href=" /cook_groups">
          <Image src={backButton} alt="Back Button" width={24} height={24} />
          </a>
          <p>{props.selected_group.group_name}</p>
          </div>
          <div className={styles.middlebarholder}>
          <div className={styles.middle_bar}>
          <Marquee
                  gradientWidth={64}

                  pauseOnHover={false}
                  className={styles.scrolling_recipes}
                >
               {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
                              {props.selected_group.shared_recipes.map((recipe, indexposition) => {
                  return <p className={styles.scrolling_recipe} key={indexposition}>{recipe.content.recipe_name}</p>;
               })}
          </Marquee>
          </div>
          </div>


      <p>{props.selected_group.group_name}</p>
      <Player
        className={styles.player_video}
        playsInline
        poster={props.selected_group.thumbnail?.url}
        src={props.selected_group.group_video?.url}
      />
      <p className={styles.groupname}>{props.selected_group.group_name}</p>

      <div className={styles.author}>
      <img
        src={props.selected_group.group_leader_info[0].profile_picture?.url}
        width={24}
        height={24}
        className={styles.authorimg}
      ></img>    
            <p>{props.selected_group.group_leader_info[0].name}</p>
      </div>

      <p className={styles.description}>{props.selected_group.description}</p>
      <h2 className={styles.section_title}>Member Benefits</h2>
      {props.selected_group.benefits.map((benefit, indexposition) => {
        return (
          <div key={indexposition} className={styles.entiredropdown} onClick={ () => {
            {benefitsopen.includes(indexposition) ? (
               setBenefitsOpen(benefitsopen.filter(benefit_special => benefit_special != indexposition)) ) : ( 
               setBenefitsOpen([ ...benefitsopen, indexposition])
            )}
            }}>
            <div className={styles.dropdownpreview}>
            <p className={styles.dropdowntitle}>{benefit.title}</p>
            {benefitsopen.includes(indexposition) ? (
            <Image src={collapse} alt="Collapse Button" width={24} height={24} />
            ) :  (<Image src={expand} alt="Expand Button" width={24} height={24}/> )
            }
            </div>

            
            {benefitsopen.includes(indexposition) ? ( 
                           <div className={styles.additionalinfo}>
            {benefit.image?.url !== undefined ? (
            <div>
               <img className={styles.dropdownimage} src={benefit.image?.url}></img>
               <p className={styles.descriptionbenefit}>{benefit.description}</p>
            </div>
            ) : (
               <p className={styles.descriptionbenefit}>{benefit.description}</p>
            )
            }                           </div>
            ) : null }

          </div>
        )
      })}

      <p className={styles.section_title}>{props.selected_group.cta.heading}</p>
      <p className={styles.description}>{props.selected_group.cta.body}</p>
      <JoinButton onClick={ () => {
         console.log(props.id)
         console.log(props.token)
         join_group(props.id, props.token)
         }} value={isJoinState}></JoinButton>
    </div>
  );
}
