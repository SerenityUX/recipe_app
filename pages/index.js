import Head from "next/head";
import styles from "../styles/Home.module.css";
import stylesitem from "../styles/recipeview.module.css";

import ShareButton from "../components/share_button";
import SmartText from "../components/smart_text";
import GiftButton from "../assets/gift.svg";
import backButton from "../assets/back.svg";
import nearby from "../assets/nearby.svg";
import mylogo from "../assets/logo.svg";
import "react-loading-skeleton/dist/skeleton.css";
import QR from "../assets/QR.svg";
import { QRCode } from "react-qrcode-logo";

import email_icon from "../assets/email.svg";


import Chip from "../components/chipv2";
import Recipepreview from "../components/recipepreview";
import Minirecipepreview from "../components/minirecipepreview";
import SwipeToDelete from "react-swipe-to-delete-ios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
import Script from "next/script";
import { useEffect } from "react";
import Modal from "react-modal";
import closeButton from "../assets/closeicon.svg";
import appBanner from "../assets/tutorial.gif";
import AddtoHome from "../assets/AddtoHome.svg";
import Share from "../assets/share.svg";

import white from "../assets/white.svg";


const draw = {
  hidden: { pathLength: 0, opacity: 0.01, r: 30, stroke: "#ffffff" },
  visible: (i) => {
    const delay = 0.01 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      stroke: "#43AA8B",
      r: 35.5,
      transition: {
        pathLength: {
          delay: 0,
          type: "tween",
          duration: 1.25,
          damping: 10,
          mass: 0.75,
          stiffness: 100,
        },
        stroke: { delay: 1.5, type: "spring", duration: 0.5 },
        opacity: { delay: 0, duration: 0.5 },
        r: { delay: 1.5, duration: 0.5 },
      },
    };
  },
};


export const ShareState = {
  Default: "Default",
  Gifting: "Gifting",
  Gifted: "Gifted",
  Failed: "Failed",
};

export const ClaimState = {
  Default: "Add to Meal Pack",
  Gifting: "Adding Recipe",
  Gifted: "Recipe Added to Meal Pack",
  Failed: "Recipe Transfer Failed",
};

const read_message = async (token, message_id) => {
  fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      gift_ledger_id: message_id,
    }),
  }).then((response) => console.log(response));
};

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
const animationvariantssearch = {
  hidden: {
    opacity: 0.01,
    scale: 0.95,
  },
  visible: { opacity: 1, scale: 1 },
};

export const CheckState = {
  Unchecked: "Unchecked",
  Checked: "Checked",
};

//const cookies = context.req.cookies.User_ID
/*       export async function getStaticProps() {
  const user_response = await fetch('https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/users')
  const user_list = await user_response.json()
 
  const response = await fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes")
  const  recipes_list = await response.json()
  return {
    props: {
       recipes_list, 
      user_list,
    }, // will be passed to the page component as props
    revalidate: 10,
}
}      */

//Version that should work below

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
      
    const user_relationships_response = await fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/get_user_relations",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  
    const user_relationships = await user_relationships_response.json();
  
    const nearby_users_response = await fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/get_nearby_users",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  
    const nearby_users = await nearby_users_response.json();
  



    const user = await getSelf(token);
    if (user.code == "ERROR_CODE_UNAUTHORIZED")
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
    const user_list = await getAllUsers();

    const recipes_list = await fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipe_list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
    ).then((res) => res.json());

    const unread_messages = await fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/get_unread_messages",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());


    return { props: { user_list, recipes_list, unread_messages, token,      
      user,
      user_relationships,
      nearby_users,
     } }; // this returns data as posts in the props to the component
  } catch (error) {
    console.log(error);
    const unread_messages = []
    const error_message = "signin"
    return {
      props: { error_message, unread_messages },
    };
  }
}
/* 
export async function getStaticPaths(index) {
  const response = await fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes?buildCache=false")
  const  props.recipes_list = await response.json()
  // Get the paths we want to pre-render based on posts
  const paths =  props.recipes_list.map((recipes) => ({
    params: { id:  props.recipes_list.id },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}  */

/* Home.getInitialProps = async (ctx) => {
  const url = 'https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes';
  const res = await axios.get(url);
  const { data } = res;
  const url2 = 'https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/users';
  const res2 = await axios.get(url2);
  const { data2 } = res2;
  return { props: {user_list: data2,  props.recipes_list: data} } // this returns data as posts in the props to the component
};
 */
/*  export async function getInitialProps (props) {
  {
    const user_response = await axios.get('https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/users')
    const user_list = response.data
    
    const response = await axios.get('https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes')
    const  props.recipes_list = response.data
    //console.log(selected_recipe)
    
  
    return {
      props: { props.recipes_list, user_list}, // will be passed to the page component as props
    }
  }
} 
 */

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
/* export async function getStaticProps() {
  const res = await fetch('https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes')
  const  props.recipes_list = await res.json()
  return {
    props: {
       props.recipes_list,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
} */

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
/*  export async function getStaticPaths(context) {
  const res = await fetch('https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes')
  const  props.recipes_list = await res.json()
  const { slug } = context;
  // Get the paths we want to pre-render based on posts
  const paths =  props.recipes_list.map((recipe) => ({
    params: {  props.recipes_list.params: context.params },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
   return { paths, fallback: 'blocking' }
}  */

/* export async function getStaticPaths(recipes) {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [], 
    fallback: false
  }
} */

/* // This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  console.log(params)
  const res = await fetch(`https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes/` + params.id)
  const recipe = await res.json() 
  const user_reponse = await fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/users")
  const user_list = await user_response.json()
  // Pass post data to the page via props
  return {
    props: { props.recipes_list: { recipe }},
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}
 */

export default function Home(props) {
  //Recipe page Information
  const [suggestions, setSuggestions] = useState([]);
  const componentRef = useRef(null);

  const [loadingnearby, setLoadingNearby] = useState([]);
  const SuggestHandler = (text) => {
    setEmail(text);
    setSuggestions([]);
  };
  const handleChanges = async (email_value, relations) => {
    const test_attempt = relations.user_relationships.map((item) => item);
    const relations_setup = relations.user_relationships.map(
      (item) => item.email
    );

    const test = relations_setup.filter((item) => {
      if (
        item.toLowerCase().trim().includes(email_value.toLowerCase().trim())
      ) {
        return item;
      }
    });

    setSuggestions(test);
    setEmail(email_value);
  };
  //Input of autocomplete ends

  const router = useRouter();



  const upload = async (result) => {
    const response = await fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/share_with_id",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          users_id: props.user.id,
          recipes_id: result,
        }),
      }
    ).then((res) => res.json());

    router.push("/recipe_page/" + response.id).then(() => {
      alert(response.recipe_name + " added to Meal Pack");
    });
  };

  const upload_change = async () => {
    fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/recipes/" + recipeId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          recipe_name: title,
          recipe_thumbnail: thumbnail,
          recipe_author: author,
          recipe_description: description,
          ingredients: ingredients,
          directions: directions.map((direction) => direction),
          tags: tags,
        }),
      }
    ).then((response) => {
      console.log(response)
      window.location.reload()
    });


  };
  const myrecipename = useRef(null);
  const mydescriptionname = useRef(null);

  const [title, setTitle] = useState(null);

  const [currentTitle, setCurrentTitle] = useState(null);

  const [currentDescription, setCurrentDescription] = useState(null);

  const [currentDirections, setCurrentDirections] = useState(null);

  const [currentIngredients, setCurrentIngredients] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [tags, setTags] = useState(null);

  const [authorName, setAuthorName] = useState(null);
  const [author, setAuthor] = useState(null);

  const [avatarURL, setAvatarURL] = useState(null);

  const [directions, setDirections] = useState();
  const [description, setDescription] = useState();


  const [ingredients, setIngredients] = useState(
  );

  const [isSharing, setIsSharing] = useState(ShareState.Default);
  const [isClaiming, setIsClaiming] = useState(ClaimState.Default);
  const [email, setEmail] = useState("");
  const [shareCode, setShareCode] = useState("");
  //Math.random().toString(36).substring(2,20);



  const attemptToGift = async () => {
    setIsSharing(ShareState.Gifting);

    const response = await fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/gift",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          email: email,
          recipes_id: recipeId,
        }),
      }
    );

    console.log(email);
    console.log(recipeId);
    console.log(response);
    if (response.status == 200) {
      setIsSharing(ShareState.Gifted);
    } else {
      setIsSharing(ShareState.Failed);
    }
  };

  const attemptToGiftNearby = async (users_email) => {
    const response = await fetch(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/gift",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          email: users_email,
          recipes_id: recipeId,
        }),
      }
    );

    if (response.status == 200) {
      console.log("worked");
    } else {
      console.log("failed");
    }
  };
  //The default value is false
  const [QRmodalIsOpen, setQRModalIsOpen] = useState(false);
  const [emailmodalIsOpen, setEmailModalIsOpen] = useState(false);
  const [selectionmodalIsOpen, setSelectionModalIsOpen] = useState(false);
  const [nearbymodalIsOpen, setNearbyModalIsOpen] = useState(false);







  //Index / Home Information

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          fetch(
            "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/store_recent_location",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/JSON",
                Authorization: `Bearer ${props.token}`,
              },
              body: JSON.stringify({
                recent_location: {
                  lng: position.coords.longitude,
                  lat: position.coords.latitude,
                },
              }),
            }
          ).then((response) => console.log(response));
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const [resultApi, setResultApi] = useState();
  /*   useEffect(() => {
    OneSignal.showNativePrompt();
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
  }, []);
 */

  const [lat, setLat] = useState(null);
  const [recipeId, setRecipeId] = useState(0);

  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const read_message = async () => {
    fetch("https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        gift_ledger_id: props.unread_messages[0]?.id,
      }),
    }).then((response) => console.log(response));
  };

  const [isChecked, setIsChecking] = useState(CheckState.Unchecked);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const toggleCheck = async () => {
    if (isChecked != CheckState.Checked) {
      //setIsChecking(CheckState.Checked);
      setSearchTag(event.target.innerHTML);
      console.log("Checked");
    } else {
      //setIsChecking(CheckState.Unchecked);
      console.log("Unchecked");
      setSearchTag("");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState("Sample");
  const [deferredPrompt, setdefferedPrompt] = useState(null);
  const install = async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();

      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setMode("PWA");
        setdefferedPrompt(null);
      }
    }
  };
  const [mode, setMode] = useState("");
  const [browser, setBrowser] = useState(false);

  useEffect(() => {
    if(props.error_message == "signin") {
      router.push(
        "/login"
      );
    }


    window.addEventListener("beforeinstallprompt", (e) => {
      setBrowser(true);
      setdefferedPrompt(e);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setMode("PWA");
    } else {
      var nav = window.navigator;
      var ua = nav.userAgent;
      function isiOsSafari(a) {
        return (
          "standalone" in nav && // There's a thing called standalone in nav
          !nav.standalone && // It is not running in standalone mode
          ua.indexOf(a) != -1 && // iPhone is in the UA string (could be Opera)
          ua.indexOf("Mac OS") != -1 && // There's Mac in the UA string (not Opera)
          ua.indexOf("Safari") != -1
        );
        /* if all the above are true this probably means this is 
         the Safari browser, 
         not a webview in an app, 
         not a page in standalone mode */
      }

      if (isiOsSafari("iPhone")) {
        setMode("iOS");
      }
      // Check if Mobile Safari on iPod
      else if (isiOsSafari("iPad")) {
        setMode("iOS");
      } else {
        setMode("Browser");
      }
    }

    getLocation();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Meal Pack</title>

        <meta
          name="Social Recipe Sharing Platform"
          content="A recipe tool to share and enjoy recipes with friends and family"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        {/* Tool used for splash screens: https://appsco.pe/developer/splash-screens */}
        <link
          href="/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      {//Recipe Page
      recipeId !== 0 ? ( 
      <main ref={componentRef}>
    <div>
      {props.token != 0 ? (
        <div>
          <div className={stylesitem.top_bar}>
            {props.user.id == author ? (
              <a onClick={() => {
                if(currentTitle != title || currentDirections != directions || currentDescription != description || currentIngredients != ingredients) {
                upload_change().then(window.location.reload())
                } else {
                  setRecipeId(0)
                  window.scrollTo(0,0)
                }}} className={stylesitem.backbutton}>
                <Image
                  src={backButton}
                  width={24}
                  height={24}
                  alt=""
                  className={stylesitem.backbutton}
                  
                />
              </a>
            ) : (
              <a onClick={() => {
                setRecipeId(0)
                window.scrollTo(0,0)
                
              }} className={stylesitem.backbutton}>
                <Image
                  src={backButton}
                  width={24}
                  height={24}
                  alt=""
                  className={stylesitem.backbutton}
                />
              </a>
            )}
            <p>{title}</p>
            {/*         {(props.user.id == author)? 
        <a className={stylesitem.giftIconButton} href={`/create_recipe/form`}>
        <Image className={stylesitem.giftIcon} src="https://svgshare.com/i/gJH.svg" />
        </a>
        : null            
        }
 */}
            {props.status !== "temporary" ? (
              <a
                className={stylesitem.giftIconButton}
                onClick={() => {
                  setSelectionModalIsOpen(true);
                  setEmailModalIsOpen(false);
                  setNearbyModalIsOpen(false);
                }}
              >
                <Image
                  width={32}
                  height={32}
                  className={stylesitem.giftIcon}
                  src={GiftButton}
                  alt="Gift"
                />
              </a>
            ) : (
              <a
                className={stylesitem.redeemText}
                onClick={() => {
                  upload(recipeId);
                }}
              >
                Redeem
              </a>
            )}
          </div>

          <Modal
            className={stylesitem.shareModal}
            isOpen={selectionmodalIsOpen}
            onRequestClose={() => setSelectionModalIsOpen(false)}
            preventScroll={true}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.0)",
              },
              content: {
                "border-radius": "12px",
                position: "absolute",
                top: "86px",
                left: "calc(45vw - 16px)",
                right: "16px",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                width: "55vw",
                "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "0px",
                height: "fit-content",
                "z-index": "150",
                cursor: "pointer",
              },
            }}
          >
            <div className={stylesitem.modalTopSelection}>
              <div
                className={stylesitem.modalOption}
                onClick={() => {
                  setSelectionModalIsOpen(false);
                  setEmailModalIsOpen(true);
                }}
              >
                <p className={stylesitem.modalTopText}> Gift by Email</p>
                <Image
                  width={24}
                  height={24}
                  className={stylesitem.giftsubIcon}
                  src={email_icon}
                  alt="Gift Email"
                />
              </div>

              <div className={stylesitem.smalldivider}></div>
              <div
                className={stylesitem.modalOption}
                onClick={() => {
                  setSelectionModalIsOpen(false);
                  setNearbyModalIsOpen(true);
                }}
              >
                <p className={stylesitem.modalTopText}> Gift Nearby</p>
                <Image
                  width={24}
                  height={24}
                  className={stylesitem.giftsubIcon}
                  src={nearby}
                  alt="Gift Nearby"
                />
              </div>
              <div className={stylesitem.smalldivider}></div>

              <div
                className={stylesitem.modalOption}
                onClick={() => {
                  const response = fetch(
                    "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/share_codes",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.token}`,
                      },
                      body: JSON.stringify({
                        share_code:
                          Math.random().toString(36).substring(2, 20) +
                          Math.random().toString(36).substring(2, 20) +
                          Math.random().toString(36).substring(2, 20) +
                          Math.random().toString(36).substring(2, 20) +
                          Math.random().toString(36).substring(2, 20) +
                          Math.random().toString(36).substring(2, 20),
                        recipes_id: recipeId,
                      }),
                    }
                  )
                    .then((res) => res.json())
                    .then((jsoned) => setShareCode(jsoned.share_code))
                    .then((jsonedo) => setQRModalIsOpen(true));
                  setSelectionModalIsOpen(false);
                }}
              >
                <p className={stylesitem.modalTopText}> Gift by QR Code</p>
                <Image
                  width={24}
                  height={24}
                  className={stylesitem.giftsubIcon}
                  src={QR}
                  alt="Gift Email"
                />
              </div>
            </div>
          </Modal>

          <Modal
            className={stylesitem.shareModal}
            isOpen={emailmodalIsOpen}
            onRequestClose={() => setEmailModalIsOpen(false)}
            preventScroll={true}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.0)",
              },
              content: {
                "border-radius": "12px",
                position: "absolute",
                top: "86px",
                right: "16px",
                left: "calc(30vw-16px)",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                width: "70vw",
                "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "16px",
                height: "200px",
                "z-index": "150",
              },
            }}
          >
            <div className={stylesitem.modalTop}>
              <p className={stylesitem.modalTopText}>Gift this Recipe</p>
              <a
                className={stylesitem.modalTopButton}
                onClick={() => setEmailModalIsOpen(false)}
              >
                <Image
                  width={24}
                  height={24}
                  className={stylesitem.giftIcon}
                  src={closeButton}
                  alt="Close Modal"
                />
              </a>
            </div>
            <div className={stylesitem.inputgroup}>
              <label className={stylesitem.inputlabel}>Email Address</label>
              <input
                value={email}
                autoComplete="off"
                onChange={(event) => {
                  handleChanges(event.target.value, props.user_relationships);
                  setIsSharing(ShareState.Default);
                }}
                type="email"
                id="email"
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 900);
                }}
                name="email"
              ></input>
              <div className={stylesitem.suggestions}>
                {suggestions &&
                  suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className={stylesitem.suggestion}
                      onClick={() => SuggestHandler(suggestion)}
                    >
                      <p key={i} className={stylesitem.top_section}>
                        {suggestion}
                      </p>
                      <div className={stylesitem.bottom_section}>
                        <img
                          className={stylesitem.small_suggestion_icon}
                          src={
                            props.user_relationships.user_relationships.map(
                              (item) => item
                            )[
                              props.user_relationships.user_relationships.findIndex(
                                (e) => e.email === suggestion
                              )
                            ].profile_picture.url
                          }
                        ></img>
                        <p className={stylesitem.small_suggestion_name}>
                          {
                            props.user_relationships.user_relationships.map(
                              (item) => item
                            )[
                              props.user_relationships.user_relationships.findIndex(
                                (e) => e.email === suggestion
                              )
                            ].name
                          }
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <ShareButton
              className={stylesitem.loginbutton}
              value={isSharing}
              onClick={attemptToGift}
            ></ShareButton>
          </Modal>

          <Modal
            className={stylesitem.shareModal}
            isOpen={nearbymodalIsOpen}
            onRequestClose={() => setNearbyModalIsOpen(false)}
            preventScroll={true}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.0)",
              },
              content: {
                "border-radius": "12px",
                position: "absolute",
                top: "86px",
                right: "16px",
                left: "calc(25vw-16px)",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                "max-width": "75vw",
                "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "16px 16px 16px 16px",
                "min-height": "fit-content",
                height: "fit-content",
                "z-index": "150",
              },
            }}
          >
            <div className={stylesitem.modalTop}>
              <p className={stylesitem.modalTopText}>Gift this Recipe</p>
              <a
                className={stylesitem.modalTopButton}
                onClick={() => {
                  setNearbyModalIsOpen(false);
                  console.log(props.nearby_users);
                }}
              >
                <Image
                  width={24}
                  height={24}
                  className={stylesitem.giftIcon}
                  src={closeButton}
                  alt="Close Modal"
                />
              </a>
            </div>
            {props.nearby_users.length === 0 ? (
              <div>
                <p>There are no nearby users who have enabled this feature</p>
                <a
                  className={stylesitem.modalA}
                  onClick={() => {
                    setNearbyModalIsOpen(false);
                    setEmailModalIsOpen(true);
                    console.log(props.nearby_users);
                  }}
                >
                  Share using email address
                </a>
              </div>
            ) : (
              <div className={stylesitem.group_of_nearby_users}>
                {props.nearby_users &&
                  props.nearby_users.map((user, i) => (
                    <div
                      key={i}
                      className={stylesitem.individual_nearby}
                      onClick={() => {
                        setLoadingNearby((loadingnearby) => [
                          ...loadingnearby,
                          user.id,
                        ]);
                        console.log(loadingnearby);
                        attemptToGiftNearby(user.email, recipeId);
                      }}
                    >
                      <div key={i} className={stylesitem.stack_profile_pic}>
                        <img
                          key={i}
                          className={stylesitem.nearby_profile_icon}
                          src={user.profile_picture.url}
                        ></img>
                        <div key={i} data-isOn={loadingnearby}>
                          {loadingnearby.includes(user.id) ? (
                            <motion.svg
                              width="76"
                              height="76"
                              viewBox="0 0 76 76"
                              initial="hidden"
                              animate="visible"
                              className={stylesitem.nearbyCircleLarge}
                            >
                              <motion.circle
                                className={stylesitem.nearbyCircle}
                                cx="38"
                                cy="38"
                                variants={draw}
                                custom={i}
                                key={i}
                              />
                            </motion.svg>
                          ) : null}
                        </div>
                      </div>
                      <p key={i} className={stylesitem.nearby_name}>
                        {user.name}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </Modal>

          <Modal
            className={stylesitem.shareModal}
            isOpen={QRmodalIsOpen}
            onRequestClose={() => setQRModalIsOpen(false)}
            preventScroll={true}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.0)",
              },
              content: {
                "border-radius": "12px",
                position: "absolute",
                top: "86px",
                right: "16px",
                left: "calc(25vw-16px)",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "16px 16px 16px 16px",
                height: "365px",
                "z-index": "150",
                width: "290px",
              },
            }}
          >
            <div>
              <div className={stylesitem.modalTop}>
                <p className={stylesitem.modalTopText}>Scannable Recipe</p>
                <a
                  className={stylesitem.modalTopButton}
                  onClick={() => {
                    setQRModalIsOpen(false);
                    console.log(props.nearby_users);
                  }}
                >
                  <Image
                    width={24}
                    height={24}
                    className={stylesitem.giftIcon}
                    src={closeButton}
                    alt="Close Modal"
                  />
                </a>
              </div>

              <div>
                {/* <p>{props.user.name} created this scannable recipe code for you</p> */}
                <div className={stylesitem.qrCode}>
                  <QRCode
                    className={stylesitem.qrCodeActual}
                    value={shareCode}
                    logoImage={mylogo.src}
                    logoOpacity={1}
                    size={249}
                    bgColor={"#f1f3f4"}
                    quietZone={0}
                    enableCORS={true}
                    removeQrCodeBehindLogo={true}
                    eyeRadius={200}
                    qrStyle={"dots"}
                    fgColor={"#2874E8"}
                    onClick={() => {
                      console.log(shareCode);
                    }}
                  />
                </div>
                <p className={stylesitem.subtext}>Scan with Meal Pack Scanner</p>{" "}
              </div>
            </div>
          </Modal>

          <div className={stylesitem.thumbnail} alt="">
            <img
            layout="fill"
              className={stylesitem.thumbnailcontent}
              src={thumbnail.url}
            ></img>
          </div>
          {props.user.id == author ? (
            <h1
              contentEditable
              className={stylesitem.title}
              ref={myrecipename}
              onKeyUp={(e) => {
                console.log(title);
                setTitle(e.target.innerText);
              }}
            >
              {currentTitle}
            </h1>
          ) : (
            <h1 ref={myrecipename} className={stylesitem.title}>
              {title}
            </h1>
          )}
          <div className={stylesitem.author}>
            <img
            width={32}
            height={32}
              className={stylesitem.authorIcon}
              src={avatarURL + "?tpl=med:box"}
              alt=""
            />

            <p>{authorName}</p>
          </div>
          {props.user.id == author ? (
            <p
              contentEditable
              className={stylesitem.description}
              ref={mydescriptionname}
              onKeyUp={(e) => {
                setDescription(e.target.innerText);
               }}
            >
              {currentDescription}
            </p>
          ) : (
            <p className={stylesitem.description} ref={mydescriptionname}>
              {description}
            </p>
          )}
          <h2 className={stylesitem.section_title}>Ingredients</h2>
          {props.user.id == author
            ? currentIngredients.map((item, index) => {
                return (
                  <li key={index} className={stylesitem.recipe_ingredients}>
                    <span
                      className={stylesitem.recipe_ingredient}
                      contentEditable
                      onKeyUp={(e) => {
                        console.log(ingredients);
                        setIngredients((current_ingredients) => {
                          const copy_of_current = [...current_ingredients];
                          copy_of_current[index] = e.target.innerText;
                          return copy_of_current;
                        });
                      }}
                    >
                      <SmartText value={item}></SmartText>
                    </span>
                  </li>
                );
              })
            : ingredients.map((item, index) => {
                return (
                  <li key={index} className={stylesitem.recipe_ingredients}>
                    <SmartText value={item}></SmartText>
                  </li>
                );
              })}
          <h2 className={stylesitem.section_title}>Directions</h2>
          {props.user.id == author ? (
            <ol type="1">
              {currentDirections.map((item, index) => {
                return (
                  <li key={index} className={stylesitem.recipe_directions}>
                    <span
                      className={stylesitem.recipe_direction}
                      contentEditable
                      onKeyUp={(e) => {
                        console.log(directions);
                        setDirections((current_directions) => {
                          const copy_of_current = [...current_directions];
                          copy_of_current[index] = e.target.innerText;
                          return copy_of_current;
                        });
                      }}
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <ol type="1">
              {directions.map((item, index) => {
                return (
                  <li key={index} className={stylesitem.recipe_directions}>
                    <SmartText value={item}></SmartText>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      ) : (
        <p onClick={console.log(props.selected_recipe.message)}>
          Invalid Permission
        </p>
      )}
    </div>

        
      </main>
      ) : 
      (
        // Home Page
      <main className={styles.main} ref={componentRef}>
        <Modal
          className={styles.Modal}
          isOpen={false}
          onRequestClose={() => {
            setMode("iOSDenied");
          }}
          preventScroll={true}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 1)",
              "backdrop-filter": "grayscale(100%) brightness(112.5%)",
            },
            content: {
              "border-radius": "12px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "none",
              background: "#FFFFFF",
              width: "100vw",
              height: "100vh",
              "align-items": "center",
              overflow: "none",
              WebkitOverflowScrolling: "touch",
              outline: "none",
              padding: "16px",
              "z-index": "250",
            },
          }}
        >
          <div>
            <div className={styles.iOSTopBar}>
              <Image
                onClick={() => {
                  setMode("DeniediOS");
                }}
                className={styles.iOSTopBarTag}
                width={24}
                height={24}
                src={closeButton}
                alt="Close Modal"
              />
              <p className={styles.iOSTopBarTag}>Install Meal Pack</p>
              <Image
                className={styles.iOSTopBarTag}
                width={24}
                height={24}
                src={white}
                alt="Close Modal"
              />
            </div>
            <div className={styles.ImageHolder}>
              <Image
              layout={"fill"}
                className={styles.BannerImage}
                src={appBanner}
                alt="Add to Homescreen Banner"
              />
            </div>
            <h4 className={styles.ThreeSteps}>Install in Four Easy Steps</h4>
            <p className={styles.ThreeStepsDescription}>
              Follow the steps below to install Meal Pack in just a few seconds
            </p>
            <div>
              <ol>
                <li className={styles.ThreeStepsDescriptionStep}>
                  <text>Tap the </text>
                  <Image
                    className={styles.ThreeStepsDescriptionStepIcon}
                    height={21}
                    width={21}
                    src={Share}
                  ></Image>{" "}
                  <text> button</text>
                </li>
                <li className={styles.ThreeStepsDescriptionStep}>
                  <text>Swipe Up</text>
                </li>
                <li className={styles.ThreeStepsDescriptionStep}>
                  <div className={styles.holder}>
                    <text>
                      Tap <u>Add to Home Screen</u>
                    </text>
                  </div>
                </li>
                <li className={styles.ThreeStepsDescriptionStep}>
                  <div className={styles.holder}>
                    <text>
                      At the top right, tap <u>Add</u>
                    </text>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </Modal>
        {mode === "PWA" || browser == false ? null : (
          <div
            onClick={() => {
              install();
            }}
            className={styles.banner}
          >
            Install Meal Pack App
          </div>
        )}
        {props.unread_messages?.length === 0 ? null : (
          <Modal
            className={styles.Modal}
            isOpen={modalIsOpen}
            onRequestClose={() => {
              setModalIsOpen(false);
              read_message();
            }}
            preventScroll={true}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                "backdrop-filter": "grayscale(30%) brightness(112.5%)",
              },
              content: {
                "border-radius": "12px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "none",
                background: "#FFFFFF",
                width: "300px",
                height: "fit-content",
                display: "flex",
                "align-items": "center",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "16px",
                "z-index": "150",
              },
            }}
          >
            <div
              className={styles.modalTop}
              onClick={() => {
                read_message(props.token, props.unread_messages[0]?.id);
                router.push(
                  "/recipe_page/" + props.unread_messages[0]?.recipes_id
                );
              }}
            >
              {/*         <a
            className={styles.modalTopButton}
            onClick={() => setModalIsOpen(false)}
          >
            <Image
              width={24}
              height={24}
              className={styles.giftIcon}
              src={closeButton}
              alt="Close Modal"
            />
          </a> */}
              <p className={styles.modalTopText}>
                {props.unread_messages[0]?.new_sent_by[0].name} Sent You a Gift
              </p>

              <Minirecipepreview
                token={props.token}
                message={props.unread_messages[0]?.id}
                author={
                  props.unread_messages[0]?.recipes_details.recipe_author[0].name
                }
                avatar={
                  props.unread_messages[0]?.recipes_details.recipe_author[0]
                    .profile_picture.url + "?tpl=med:box"
                }
                title={props.unread_messages[0]?.recipes_details.recipe_name}
                key={props.unread_messages[0]?.recipes_details.id}
                id={props.unread_messages[0]?.recipes_details.id}
                thumbnail={
                  props.unread_messages[0]?.recipes_details.recipe_thumbnail.url + "?tpl=large"
                }
              ></Minirecipepreview>
            </div>
          </Modal>
        )}
        <div className={styles.topbar}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationvariants}
            transition={{ ease: "easeOut", duration: 0.15, delay: 0.05 }}
          >
            <h1 className={styles.maintitle}>My Recipes</h1>
          </motion.div>
          <div className={styles.actionItems}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animationvariantsbuttons}
              transition={{ ease: "easeOut", duration: 0.15, delay: 0.15 }}
            >
              <Link href={`/QRScan`} className={styles.navButtonQR}>
                <Image
                  width={32}
                  height={32}
                  src={navButtonQR}
                  className={styles.navButtonQR}
                />
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animationvariantsbuttons}
              transition={{ ease: "easeOut", duration: 0.15, delay: 0.05 }}
            >
              <Link
                href={`/create_recipe/form`}
                className={styles.navButtonCreation}
              >
                <Image
                  width={32}
                  height={32}
                  className={styles.navButtonCreation}
                  src={createButton}
                />
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationvariantssearch}
          transition={{ ease: "easeOut", duration: 0.15, delay: 0.2 }}
        >
          <div className={styles.search_bar}>
            <Image
              src={SearchIcon}
              className={styles.search_icon}
              alt="Search Icon"
              height={24}
              width={24}
            ></Image>
            <input
              autoComplete="off"
              id="searchinput"
              name="searchinput"
              placeholder="Search Recipes"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>
        </motion.div>

        {/*         <div className={styles.tagwrapper}>
          {categories.map((item) => {
            return (
              <Chip
                value={item}
                key={item}
                checked={isChecked}
                onClick={() => {
                  toggleCheck();
                }}
              ></Chip>
            );
          })}
        </div> */}
        <div className={styles.previewwrapper}>
          {Array.isArray(props.recipes_list) &&
            props.recipes_list
              .filter((item) => {
                if (searchTerm == "") {
                  return item;
                } else if (
                  item.recipe_name
                    .toLowerCase()
                    .trim()
                    .includes(searchTerm.toLowerCase().trim())
                ) {
                  return item;
                } else if (
                  item.ingredients
                    .join()
                    .toLowerCase()
                    .trim()
                    .includes(searchTerm.toLowerCase().trim())
                ) {
                  return item;
                } else if (
                  item.tags
                    .join()
                    .toLowerCase()
                    .trim()
                    .includes(searchTerm.toLowerCase().trim())
                ) {
                  return item;
                }
              })
              .map((item) => {
                const identify_author = props.user_list.find(
                  (user) => user.id == item.recipe_author
                );
                return (
                  <div key={item.id} className={styles.massivecontainer}>
                                           <motion.div
                          className={styles.backgroundcoloradder}
                          key={item.id}
                          initial="hidden"
                          animate="visible"
                          variants={animationvariantssearch}
                          transition={{
                            ease: "easeOut",
                            duration: 0.2,
                            delay: 0.25,
                          }}
                        >
                    <SwipeToDelete
                      key={item.id}
                      // optional
                      height={114} // default
                      transitionDuration={250} // default
                      deleteWidth={75} // default
                      deleteColor="rgba(252, 58, 48, 1.00)" // default
                      deleteText="Delete" // default
                      id="swiper-1" // not default
                      onDeleteConfirm={(onSuccess, onCancel) => {
                        if (
                          window.confirm(
                            "Do you really want to delete this recipe?"
                          )
                        ) {
                          fetch(
                            "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/deleterecipe",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/JSON",
                                Authorization: `Bearer ${props.token}`,
                              },
                              body: JSON.stringify({
                                recipes_id: item.id,
                              }),
                            }
                          ).then((response) => window.location.reload());
                        } else {
                          console.log("kept");
                        }
                      }}
                    >
                      <div className={styles.backgroundcoloradder} onClick={() => {
                            
                            setRecipeId(item.id)
                            window.scrollTo(0,0)
                            setTitle(item.recipe_name)
                            setCurrentTitle(item.recipe_name)
                            setThumbnail(item.recipe_thumbnail)

                            setTags(item.tags)
                            setAvatarURL(item.author_details.profile_picture.url)
                            setAuthorName(item.author_details.name)
                            setAuthor(item.author_details.id)


                            setDirections(item.directions)
                            setCurrentDirections(item.directions)
                            setDescription(item.recipe_description)
                            setCurrentDescription(item.recipe_description)

                            setCurrentIngredients(item.ingredients)
                            setIngredients(item.ingredients)

                            console.log(recipeId)
                          }}>

                          <Recipepreview
                          
                            author={identify_author.name}
                            avatar={identify_author.profile_picture.url}
                            title={item.recipe_name}
                            key={item.id}
                            id={item.id}
                            thumbnail={item.recipe_thumbnail.url}
                            tags={item.tags}
                            description={item.recipe_description}
                            ingredients={item.ingredients}
                            directions={item.directions}
                          ></Recipepreview>
                        
                      </div>
                    </SwipeToDelete>
                    </motion.div>
                  </div>
                );
              })}
        </div>
      </main>)}
    </div>
  );
}
