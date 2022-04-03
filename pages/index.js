import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Chip from '../components/chip'
import Recipepreview from '../components/recipepreview'
import search_icon from '../assets/search_icon.svg'
const recipe_thumbnail_test = '../assets/recipe_thumbnail.png'
import recipepage from './recipe_page/[id]'
// import  props.recipes_list from '../recipes.json'
import next from 'next'
import react from 'react'
import Link from 'next/link';
const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies", "Snacks", "Juices"]
import axios from "axios";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import * as React from 'react'
import { NextApiRequest, NextApiResponse } from "next";


 /*      export async function getStaticProps() {

  const user_response = await fetch('https://dev.createforever.media/api:lSOVAmsS/users?_vercel_no_cache=1')
  const user_list = await user_response.json()
 
  const response = await fetch("https://dev.createforever.media/api:lSOVAmsS/recipes?_vercel_no_cache=1")
  const  props.recipes_list = await response.json()
  return {
    props: {
       props.recipes_list, 
      user_list,
    }, // will be passed to the page component as props
    revalidate: 10,
}
}    
  */

//Version that should work below 
      export async function getServerSideProps(props) {
        const user_response = await fetch('https://dev.createforever.media/api:lSOVAmsS/users?_vercel_no_cache=1')
        console.log(user_response)
        const user_list = await user_response.json()
        console.log(user_list)
        const response = await fetch("https://dev.createforever.media/api:lSOVAmsS/recipes?_vercel_no_cache=1")
        console.log(response)
        const  recipes_list = await response.json()
        console.log(recipes_list)
    return { props: {user_list,  recipes_list} } // this returns data as posts in the props to the component
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
             { props.recipes_list.map(item => {
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
