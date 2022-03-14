import styles from '../styles/recipepreview.module.css'
import recipe_thumbnail from '../assets/recipe_thumbnail.png'
import next from 'next'
import react from 'react'
import Link from 'next/Link'
import { useRouter } from 'next/router'



import recipepage from '../pages/recipe_page/[recipe]'

//All components export a default function 
//Functions have uppercase function name



//Use props as a parameter 
export default function recipepreview (props) {
    return (
        //Copying styles from the styles we have to find
        //Take div component styles
        //Called styles bc that's what we imported 
    <div className={styles.recipepreview}>
        <Link href={`/recipe_page/${props.id}`}>
            <a>
            <div className={styles.left}>
                <h1 className={styles.title}>{props.title}</h1>
                <div className={styles.author}>
                    <img src={props.avatar}/>
                    <p>{props.author}</p>
                </div>
            </div>
            <div className={styles.right}>
                <img src={props.thumbnail}/>
            </div>
            </a>
        </Link>
    </div>
    )
}
