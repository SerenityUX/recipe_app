import styles from "../styles/cook_groups_home.module.css";
import Link from "next/link";
import Image from "next/image";
import getSelf from "../lib/getSelf";
import getAllUsers from "../lib/getAllUsers";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  try {
    const token = context.req?.cookies?.token;
    if (!token)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };

    const user = await getSelf(token);
    const user_list = await getAllUsers();

    const group_list = await fetch(
      "https://dev.createforever.media/api:lSOVAmsS/groups"
    ).then((res) => res.json());

    return { props: { user_list, token, group_list } }; // this returns data as posts in the props to the component
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}

const Cook_groups = (props) => {
  console.log(props.group_list);
  //https://www.npmjs.com/package/react-qr-reader
  return (
    <main className={styles.main}>
      <div className={styles.topbar}>
        <h1 className={styles.maintitle}>Cook Groups</h1>

        <div className={styles.actionItems}></div>
      </div>
      {props.group_list.map((item, index) => {
        return (
          <div key={index} className={styles.group_banner}>
            <img
              className={styles.banner_group}
              src={item.group_banner.url}
              alt={item.group_name}
            ></img>
            <div className={styles.group_information}>
              <p className={styles.group_name}>{item.group_name}</p>
              <div className={styles.right_info}>
                <img
                  className={styles.group_member_leader}
                  src={item.group_leader_info.profile_picture.url}
                  alt={item.group_name}
                ></img>
                <p className={styles.group_leader_text}>
                  {item.group_leader_info.name}
                </p>
              </div>
              {item.group_members.length * 32 > 300 ? (
                <Marquee
                  gradientWidth={128}
                  pauseOnHover={false}
                  className={styles.scrolling_group_members}
                >
                  {item.group_members.map((member, indexposition) => {
                    return (
                      <img
                        className={styles.group_member}
                        key={indexposition}
                        src={member.user_profile_for_scroll.profile_picture.url}
                        alt={member.user_profile_for_scroll.name}
                      ></img>
                    );
                  })}
                </Marquee>
              ) : (

                <div className={styles.group_list}
                >
                  {item.group_members.map((member, indexposition) => {
                    return (
                      <img
                        className={styles.group_member}
                        key={indexposition}
                        src={member.user_profile_for_scroll.profile_picture.url}
                        alt={member.user_profile_for_scroll.name}
                      ></img>
                    );
                  })}
                </div>



              )}
            </div>
            <div className={styles.divider}></div>
          </div>
        );
      })}
    </main>
  );
};

export default Cook_groups;
