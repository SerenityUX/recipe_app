import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Chip from '../components/chip'
import Recipepreview from '../components/recipepreview'
import search_icon from '../assets/search_icon.svg'
const recipe_thumbnail_test = '../assets/recipe_thumbnail.png'
import recipepage from './recipe_page/[recipe]'

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies", "Snacks", "Juices"]

const recipes_list = [
  {
      name: "Quick Chickpea Bolognese",
      id: 1,
      thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
      author: {
          name: "Leslie Alexander",
          avatar: "https://i.ibb.co/vYr62SF/profile.png"
      },
      tags: ["dinner", "vegan", "pasta"],
      description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
      ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
      directions: [
          "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
          "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
          "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
          "Add the mushrooms and sauté for about 2 minutes.",
          "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
          "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
      ]
  },
  {
    name: "Quick Chickpea Bolognese",
    id: 2,
    thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
    author: {
        name: "Leslie Alexander",
        avatar: "https://i.ibb.co/vYr62SF/profile.png"
    },
    tags: ["dinner", "vegan", "pasta"],
    description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
    ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
    directions: [
        "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
        "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
        "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
        "Add the mushrooms and sauté for about 2 minutes.",
        "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
        "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
    ]
},
{
  name: "Quick Chickpea Bolognese",
  id: 2,
  thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
  author: {
      name: "Leslie Alexander",
      avatar: "https://i.ibb.co/vYr62SF/profile.png"
  },
  tags: ["dinner", "vegan", "pasta"],
  description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
  ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
  directions: [
      "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
      "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
      "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
      "Add the mushrooms and sauté for about 2 minutes.",
      "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
      "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
  ]
},
{
  name: "Quick Chickpea Bolognese",
  id: 2,
  thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
  author: {
      name: "Leslie Alexander",
      avatar: "https://i.ibb.co/vYr62SF/profile.png"
  },
  tags: ["dinner", "vegan", "pasta"],
  description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
  ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
  directions: [
      "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
      "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
      "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
      "Add the mushrooms and sauté for about 2 minutes.",
      "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
      "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
  ]
},
{
  name: "Quick Chickpea Bolognese",
  id: 2,
  thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
  author: {
      name: "Leslie Alexander",
      avatar: "https://i.ibb.co/vYr62SF/profile.png"
  },
  tags: ["dinner", "vegan", "pasta"],
  description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
  ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
  directions: [
      "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
      "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
      "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
      "Add the mushrooms and sauté for about 2 minutes.",
      "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
      "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
  ]
},
{
  name: "Quick Chickpea Bolognese",
  id: 2,
  thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
  author: {
      name: "Leslie Alexander",
      avatar: "https://i.ibb.co/vYr62SF/profile.png"
  },
  tags: ["dinner", "vegan", "pasta"],
  description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
  ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
  directions: [
      "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
      "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
      "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
      "Add the mushrooms and sauté for about 2 minutes.",
      "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
      "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
  ]
},
{
  name: "Quick Chickpea Bolognese",
  id: 2,
  thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
  author: {
      name: "Leslie Alexander",
      avatar: "https://i.ibb.co/vYr62SF/profile.png"
  },
  tags: ["dinner", "vegan", "pasta"],
  description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
  ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
  directions: [
      "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
      "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
      "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
      "Add the mushrooms and sauté for about 2 minutes.",
      "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
      "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
  ]
},
{
  name: "Quick Chickpea Bolognese",
  id: 2,
  thumbnail: "https://i.ibb.co/mX2jJkh/recipe-thumbnail.png",
  author: {
      name: "Leslie Alexander",
      avatar: "https://i.ibb.co/vYr62SF/profile.png"
  },
  tags: ["dinner", "vegan", "pasta"],
  description: "Got a few minutes and want something delicious and totally nourishing for dinner? Try this quick vegan chickpea bolognese sauce over your favorite pasta!",
  ingredients: ["1½ cups diced red onion", "3 cloves fresh garlic, minced", "1 (15.5-ounce) can chickpeas, rinsed, drained, and chopped (1½ cups)", "1 medium carrot, cut into ¼-inch dice", "1 cup mushrooms (any kind you like), cut into ¼-inch dice", "1 (14.5-ounce) can diced tomatoes (1½ cups)", "1 (15-ounce) can tomato sauce (1½ cups)", "½ tablespoon dried oregano", "1 tablespoon dried parsley", "Sea Salt", "3 cups cooked brown rice penne or fusilli pasta (or any other whole-grain pasta)"],
  directions: [
      "Heat a large saucepan over medium heat, add the red onions, garlic, chickpeas, carrots, and a dash of salt.",
      "Sauté the vegetables for about 5 minutes, or until the onions are slightly translucent.",
      "Add water 1 to 2 tablespoons at a time, as needed, to keep vegetables from sticking to the pan.",
      "Add the mushrooms and sauté for about 2 minutes.",
      "Add the diced tomatoes, tomato sauce, oregano, and parsley. Sauté for 2 more minutes, taste and adjust seasoning.",
      "Pour as much of the sauce as you like over the pasta and eat up—it's all fantastic for you and tastes even better."
  ]
}
]


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
      <h1 className={styles.maintitle}>My Recipes</h1>
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
              <Recipepreview author={item.author.name} avatar={item.author.avatar} title={item.name} id={item.id} thumbnail={item.thumbnail} tags={item.tags} description={item.description} ingredients={item.ingredients} directions={item.directions}></Recipepreview>
              )
            })}
        </div>
        <div className="divider"></div>
      </main>
    </div>
  )
}
