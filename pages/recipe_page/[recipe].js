//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router"
import list_of_recipes from "../../recipes.json";
import styles from '../../styles/recipepreview.module.css'



//Start of recipe page component
export default function Recipe (props) {
    //Access the recipe information from router
    const router = useRouter()
    // { } is based on file name. 
    // Dynamic data stored inside { }
    const { recipe } = router.query


    //Rendering a component to the page
    return (<div>
        <div>
            <a href=" / ">back button</a>
            <p>{list_of_recipes[recipe - 1].name}</p>
        </div>
        <img src={list_of_recipes[recipe - 1].thumbnail}/>
        <h1>{list_of_recipes[recipe - 1].name}</h1>
        <div className={styles.author}>
            <img src={list_of_recipes[recipe - 1].author.avatar}/>
            <p>{list_of_recipes[recipe - 1].author.name}</p>
        </div>
        <p>{list_of_recipes[recipe - 1].description}</p>
        <h2>Ingredients</h2>
        {list_of_recipes[recipe - 1].ingredients.map(item => {
            return(
                <li>{item}</li>
              )
        })}
        <h2>Directions</h2>
        <ol type="1.">
        {list_of_recipes[recipe - 1].ingredients.map(item => {
            return(
                <li>{item}</li>
              )
        })}
        </ol>
        </div>)
        
}