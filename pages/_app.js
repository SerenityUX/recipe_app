import '../styles/globals.css'
import { useEffect } from "react"
import {createContext} from 'react'
import { useState, useRef } from "react";
import OneSignal from 'react-onesignal';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    OneSignal.init({
      appId: "e0869f1d-3eaf-47af-8444-e9b2ae4602a7"
    });
  }, []);

  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])
  return <Component {...pageProps} />
  
}

export default MyApp