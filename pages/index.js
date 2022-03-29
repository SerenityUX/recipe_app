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

export async function getStaticProps(props) {

  const user_response = await fetch('https://dev.createforever.media/api:lSOVAmsS/users')
  const user_list = await user_response.json()
 
  const response = await fetch('https://dev.createforever.media/api:lSOVAmsS/recipes')
  const recipes_list = await response.json()
  return {
    props: {recipes_list, user_list}, // will be passed to the page component as props
    revalidate: 100
  }
}


export default function Home(props) {
  console.log(props)
  return (
    <div className={styles.container}>
      <Head>
        <title>Leftovers</title>
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
              return(
              <Recipepreview author={props.user_list[item.recipe_author - 1].name} avatar={props.user_list[item.recipe_author - 1].profile_picture.url} title={item.recipe_name} key={item.id} id={item.id} thumbnail={item.recipe_thumbnail.url} tags={item.tags} description={item.recipe_description} ingredients={item.ingredients} directions={item.directions}></Recipepreview>
              )
            })}
        </div>
      </main>
    </div>
  )
}
