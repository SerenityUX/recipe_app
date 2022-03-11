//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router"

//Start of recipe page component
export default function Recipe (props) {
    //Access the recipe information from router
    const router = useRouter()
    // { } is based on file name. 
    // Dynamic data stored inside { }
    const { recipe } = router.query


    //Rendering a component to the page
    return (<div>
        <h1>{href}</h1>
        <div className={styles.author}>
            <img src={props.avatar}/>
            <p>{props.author}</p>
        </div>
        <p>{props.description}</p>
        <h2>Ingredients</h2>
        props.ingredients.forEach(
            return (
                <li>props.ingredients[index]</li>
            )
        )
        <li>props.ingredients[1]</li>
        </div>)
}