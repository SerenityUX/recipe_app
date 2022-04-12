
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

const QRScan = (props) => {
  const [data, setData] = useState('No result');
//https://www.npmjs.com/package/react-qr-reader
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};

export default QRScan;
