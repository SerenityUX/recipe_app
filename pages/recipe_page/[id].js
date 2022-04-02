//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router"
//import list_of_recipes from "../../recipes.json";
import styles from '../../styles/recipeview.module.css'
import Image from 'next/image'

export async function getStaticProps(props) {

  const user_response = await fetch('https://dev.createforever.media/api:lSOVAmsS/users')
  const user_list = await user_response.json()
 
  const response = await fetch('https://dev.createforever.media/api:lSOVAmsS/recipes')
  const recipes_list = await response.json()
  return {
    props: {
      recipes_list, 
      user_list,
    }, // will be passed to the page component as props
  revalidate: 10,
}
};



//Start of recipe page component
export default function Recipe (props) {
  
  const identify_author = props.user_list.find((user) => user.id == props.selected_recipe.recipe_author)
    //Access the recipe information from router
    //const router = useRouter()
    // { } is based on file name. 
    // Dynamic data stored inside { }
    //const { id } = router.query

    //Rendering a component to the page
    return (
        //<div>{JSON.stringify(props.selected_recipe)}</div>
        <div>
        <div className={styles.top_bar}>
            <a href=" / "><img src="https://i.ibb.co/SVPT9Yn/backbutton.png" alt=""/></a>
            <p>{props.selected_recipe.recipe_name}</p>
        </div>
        <img src={props.selected_recipe.recipe_thumbnail?.url} className={styles.thumbnail} alt=""/>
        <h1  className={styles.title}>{props.selected_recipe.recipe_name}</h1>
        <div className={styles.author}>
          
            <img src={identify_author.profile_picture?.url} alt=""/>
            <p>{identify_author.name}</p>
        </div>
        <p className={styles.description}>{props.selected_recipe.recipe_description}</p>
        <h2 className={styles.section_title}>Ingredients</h2>
        {props.selected_recipe.ingredients.map((item, index) => {
            return(
                <li key={index} className={styles.recipe_ingredients}>{item}</li>
              )
        })}
        <h2 className={styles.section_title}>Directions</h2>
        <ol type="1.">
        {props.selected_recipe.directions.map((item, index) => {
            return(
                <li key={index} className={styles.recipe_directions}>{item}</li>
              )
        })}
        </ol>
        </div>
        )
        
}