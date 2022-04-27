import Head from "next/head";
import styles from "../styles/Home.module.css";
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
import Script from 'next/script'

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

  const user_response = await fetch('https://dev.createforever.media/api:lSOVAmsS/users')
  const user_list = await user_response.json()
 
  const response = await fetch("https://dev.createforever.media/api:lSOVAmsS/recipes")
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

    const user = await getSelf(token);
    const user_list = await getAllUsers();
    
    const recipes_list = await fetch(
      "https://dev.createforever.media/api:lSOVAmsS/recipe_list?users_id=" +
        user?.id
    ).then((res) => res.json());

    return { props: { user_list, recipes_list } }; // this returns data as posts in the props to the component
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
/* 
export async function getStaticPaths(index) {

  const response = await fetch("https://dev.createforever.media/api:lSOVAmsS/recipes?buildCache=false")
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
  const url = 'https://dev.createforever.media/api:lSOVAmsS/recipes';
  const res = await axios.get(url);
  const { data } = res;
  const url2 = 'https://dev.createforever.media/api:lSOVAmsS/users';
  const res2 = await axios.get(url2);
  const { data2 } = res2;
  return { props: {user_list: data2,  props.recipes_list: data} } // this returns data as posts in the props to the component
};
 */
/*  export async function getInitialProps (props) {
  {
    const user_response = await axios.get('https://dev.createforever.media/api:lSOVAmsS/users')
    const user_list = response.data
    
    const response = await axios.get('https://dev.createforever.media/api:lSOVAmsS/recipes')
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
  const res = await fetch('https://dev.createforever.media/api:lSOVAmsS/recipes')
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
  const res = await fetch('https://dev.createforever.media/api:lSOVAmsS/recipes')
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
  const res = await fetch(`https://dev.createforever.media/api:lSOVAmsS/recipes/` + params.id)
  const recipe = await res.json() 

  const user_reponse = await fetch("https://dev.createforever.media/api:lSOVAmsS/users")
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
  const [isChecked, setIsChecking] = useState(CheckState.Unchecked);

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
    console.log(searchTag);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState("Sample");

  return (
    <div className={styles.container}>
      <Head>
      <Script defer data-domain="mealpack.app" src="https://plausible.io/js/plausible.js"></Script>
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
        <link rel="manifest" href="/manifest.json" />
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

      <main className={styles.main}>
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
                console.log(searchTag);

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
                  <motion.div
                    key={item.id}
                    initial="hidden"
                    animate="visible"
                    variants={animationvariantssearch}
                    transition={{ ease: "easeOut", duration: 0.2, delay: 0.25 }}
                  >
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
                  </motion.div>
                );
              })}
        </div>
      </main>
    </div>
  );
}
