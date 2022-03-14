import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Chip from '../components/chip'
import Recipepreview from '../components/recipepreview'
import search_icon from '../assets/search_icon.svg'
const recipe_thumbnail_test = '../assets/recipe_thumbnail.png'
import recipepage from './recipe_page/[recipe]'
import recipes_list from '../recipes.json'
import Link from 'next/Link'
import next from 'next'
import react from 'react'

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies", "Snacks", "Juices"]

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Leftovers</title>
        <meta name="Social Recipe Sharing Platform" content="A recipe tool to share and enjoy recipes with friends and family" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
      <div className={styles.topbar}>
      <h1 className={styles.maintitle}>My Recipes</h1>
      {/* <Link href={`/create_recipe/form`}>+</Link> */}
      </div>
      
        <div className={styles.search_bar}>
        <img src="https://i.ibb.co/nssL0qW/search-icon.png" className={styles.search_icon}></img>
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
            {recipes_list.map(item => {
              return(
              <Recipepreview author={item.author.name} avatar={item.author.avatar} title={item.name} key={item.key} id={item.key} thumbnail={item.thumbnail} tags={item.tags} description={item.description} ingredients={item.ingredients} directions={item.directions}></Recipepreview>
              )
            })}
        </div>
        <div className="divider"></div>
      </main>
    </div>
  )
}
