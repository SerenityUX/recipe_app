import '../styles/globals.css'
import { useEffect } from "react"
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "da6f46fd-345a-4232-9931-83cfd8026239",
            notifyButton: {
                enable: true,
            },
  
            allowLocalhostAsSecureOrigin: true,
        });
    });
  
    return () => {
        window.OneSignal = undefined;
    };
  }, []); // <-- run this effect once on mount
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