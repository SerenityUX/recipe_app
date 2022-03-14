//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router"
import list_of_recipes from "../../recipes.json";
import styles from '../../styles/recipeview.module.css'



//Start of recipe page component
export default function Recipe (props) {
    //Access the recipe information from router
    const router = useRouter()
    // { } is based on file name. 
    // Dynamic data stored inside { }
    const { recipe } = router.query

    //Rendering a component to the page
    return (
        <div>
        <div className={styles.top_bar}>
            <a href=" / "><img src="https://i.ibb.co/SVPT9Yn/backbutton.png" /></a>
            <p>{list_of_recipes[recipe - 1].name}</p>
        </div>
        <img src={list_of_recipes[recipe - 1].thumbnail} className={styles.thumbnail}/>
        <h1  className={styles.title}>{list_of_recipes[recipe - 1].name}</h1>
        <div className={styles.author}>
            <img src={list_of_recipes[recipe - 1].author.avatar}/>
            <p>{list_of_recipes[recipe - 1].author.name}</p>
        </div>
        <p className={styles.description}>{list_of_recipes[recipe - 1].description}</p>
        <h2 className={styles.section_title}>Ingredients</h2>
        {list_of_recipes[recipe - 1].ingredients.map(item => {
            return(
                <li key={item} className={styles.recipe_ingredients}>{item}</li>
              )
        })}
        <h2 className={styles.section_title}>Directions</h2>
        <ol type="1.">
        {list_of_recipes[recipe - 1].directions.map(item => {
            return(
                <li key={item} className={styles.recipe_directions}>{item}</li>
              )
        })}
        </ol>
        </div>)
        
}