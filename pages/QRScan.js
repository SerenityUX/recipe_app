import getSelf from "../lib/getSelf";
import getAllUsers from "../lib/getAllUsers";


import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import styles from "../styles/qr_scan.module.css";
import { useRouter } from "next/router";
import backButton from "../assets/back.svg"
import Image from 'next/image'

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

    return { props: { user } }; // this returns data as posts in the props to the component
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}



const QRScan = (props) => {
  const router = useRouter();

  const [data, setData] = useState('No result');

  const upload = async (result) => {

    const results = result
    const scan_code_results = await fetch(
      "https://dev.createforever.media/api:lSOVAmsS/scan_share_code",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          users_id: props.user.id,
          share_code: results,
        }),
      }
    ).then((res) => res.json());

    const response = await fetch(
      "https://dev.createforever.media/api:lSOVAmsS/share_with_id",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          users_id: props.user.id,
          recipes_id: scan_code_results.recipe_id,
        }),
      }
    ).then((res) => res.json());

    router.push("/recipe_page/" + response.id).then(() => {
        alert(response.recipe_name + " added to Meal Pack");
    }
    )    
  }

  
//https://www.npmjs.com/package/react-qr-reader
  return (
    
    <div>
      <div className={styles.top_bar}>
        <a href=" / ">
          <Image src={backButton} alt="Back Button" width={24} height={24} />
        </a>
        <p>Scan a Recipe</p>
      </div>
      <QrReader        
      onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            //alert(result?.text)
            //https://dev.createforever.media/api:lSOVAmsS/scan_share_code
            upload(result?.text)
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ 
            width: '100vw',
            height: '100vh',
            display: 'absolute'
        }}
        scanDelay={
          2500
        }
        constraints={{
            facingMode: 'environment'
        }}
        videoContainerStyle={{
            height: '100vh',
            width: '100vw',
            'object-fit': 'cover',
        }}
        videoStyle={{
            height: '100vh',
            width: '100vw',
            'object-fit': 'cover',            
        }}
      />
    </div>
  );
};

export default QRScan;
