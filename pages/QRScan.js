
/* 
export async function getServerSideProps(context) {
  try {
    const token = context.req?.cookies?.token
    if (!token) return {
      redirection: {
        destination: '/login',
        permanent: false,
      }
    }
    const user = await getSelf( token )
    return { props: { 
      user
    } };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    }
  }
} */

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import styles from "../styles/qr_scan.module.css";

const QRScan = (props) => {
  const [data, setData] = useState('Scan a recipe');
//https://www.npmjs.com/package/react-qr-reader
  return (
    
    <div>
      <QrReader        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ 
            width: '100vw',
            height: '100vh',
        }}
      />
      <p>{data}</p>
    </div>
  );
};

export default QRScan;
