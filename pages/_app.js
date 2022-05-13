import '../styles/globals.css'
import { useEffect } from "react"
import {createContext} from 'react'
import { useState, useRef } from "react";
/* import OneSignal from "react-onesignal";
 */
function MyApp({ Component, pageProps }) {

  useEffect(() => {
/*     Notification.requestPermission(status => {
      console.log("Permission status:", status)
    }); */
    

    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "da6f46fd-345a-4232-9931-83cfd8026239",
            safari_web_id: "web.onesignal.auto.365cbfbd-b203-4342-b6f2-394fa1a1712a",
            notifyButton: {
                enable: false,
            },
        });
    });
    return () => {
        window.OneSignal = undefined;
    };
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