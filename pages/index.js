import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Chip from '../components/chip'
import Recipepreview from '../components/recipepreview'
import search_icon from '../assets/search_icon.svg'
const recipe_thumbnail_test = '../assets/recipe_thumbnail.png'
import recipepage from './recipe_page/[id]'
// import recipes_list from '../recipes.json'
import next from 'next'
import react from 'react'
import Link from 'next/link';
const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies", "Snacks", "Juices"]
import axios from "axios";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as React from 'react'
 


   export async function getStaticProps(props) {

  const user_response = await fetch('https://dev.createforever.media/api:lSOVAmsS/users?buildCache=false')
  const user_list = await user_response.json()
 
  const response = await fetch("https://dev.createforever.media/api:lSOVAmsS/recipes?buildCache=false")
  const recipes_list = await response.json()
  return {
    props: {
      recipes_list, 
      user_list,
    }, // will be passed to the page component as props
    revalidate: 10,
}
}  


//Version that should work below 
/*    export async function getServerSideProps(props) {
    const url = 'https://dev.createforever.media/api:lSOVAmsS/recipes?_vercel_no_cache=1';
    const res = await axios.get(url);
    const { recipes_list } = res;
    const url2 = 'https://dev.createforever.media/api:lSOVAmsS/users?_vercel_no_cache=1';
    const res2 = await axios.get(url2);
    const { user_list } = res2;
    return { props: {user_list: user_list, recipes_list: recipes_list} } // this returns data as posts in the props to the component
}     */
/* 
export async function getStaticPaths(props) {
  const user_response = await fetch('https://dev.createforever.media/api:lSOVAmsS/users')
  const user_list = await user_response.json()

  const response = await fetch("https://dev.createforever.media/api:lSOVAmsS/recipes")
  const recipes_list = await response.json()

  // Get the paths we want to pre-render based on posts
  const paths = recipes_list.map((recipes) => ({
    params: { id: recipes_list.id, id: user_list.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
} */

/* Home.getInitialProps = async (ctx) => {
  const url = 'https://dev.createforever.media/api:lSOVAmsS/recipes';
  const res = await axios.get(url);
  const { data } = res;
  const url2 = 'https://dev.createforever.media/api:lSOVAmsS/users';
  const res2 = await axios.get(url2);
  const { data2 } = res2;
  return { props: {user_list: data2, recipes_list: data} } // this returns data as posts in the props to the component
};
 */
/*  export async function getInitialProps (props) {
  {
    const user_response = await axios.get('https://dev.createforever.media/api:lSOVAmsS/users')
    const user_list = response.data
    
    const response = await axios.get('https://dev.createforever.media/api:lSOVAmsS/recipes')
    const recipes_list = response.data
    //console.log(selected_recipe)
    

  
    return {
      props: {recipes_list, user_list}, // will be passed to the page component as props
    }
  }
} 
 */


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
/* export async function getStaticProps() {
  const res = await fetch('https://dev.createforever.media/api:lSOVAmsS/recipes')
  const recipes_list = await res.json()

  return {
    props: {
      recipes_list,
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
  const recipes_list = await res.json()
  const { slug } = context;
  // Get the paths we want to pre-render based on posts
  const paths = recipes_list.map((recipe) => ({
    params: { recipes_list.params: context.params },
  }))



  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
   return { paths, fallback: 'blocking' }
}  */

export default function Home(props) {

  console.log(props)
  return (
    <div className={styles.container}>
      <Head>
        <title>Meal Pack</title>
        <meta name="Social Recipe Sharing Platform" content="A recipe tool to share and enjoy recipes with friends and family" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div className={styles.topbar}>
      <h1 className={styles.maintitle}>My Recipes</h1>
      <Link href={`/create_recipe/form`}><img src="https://i.ibb.co/vX7FXB3/createbutton.png" /></Link>
      </div>
      
        <div className={styles.search_bar}>
        <img src="https://i.ibb.co/nssL0qW/search-icon.png" className={styles.search_icon} alt="Search Icon"></img>
            <p>Search Recipes</p>
        </div>

        <div className={styles.tagwrapper}>
            {categories.map(item => {
              return(
              <Chip text={item} key={item}></Chip>
              )
            })}
        </div>
        <div className={styles.previewwrapper}>
            {props.recipes_list.map(item => {
              const identify_author = props.user_list.find((user) => user.id == item.recipe_author)
              return(
              <Recipepreview author={identify_author.name} avatar={identify_author.profile_picture.url} title={item.recipe_name} key={item.id} id={item.id} thumbnail={item.recipe_thumbnail.url} tags={item.tags} description={item.recipe_description} ingredients={item.ingredients} directions={item.directions}></Recipepreview>
              )
            })}
        </div>
      </main>
    </div>
  )
}
