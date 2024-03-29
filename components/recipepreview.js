import styles from '../styles/recipepreview.module.css'
import recipe_thumbnail from '../assets/recipe_thumbnail.png'
import next from 'next'
import react from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image'


import recipepage from '../pages/recipe_page/[id]'
import { isDynamicRoute } from 'next/dist/shared/lib/router/utils';

//All components export a default function 
//Functions have uppercase function name



//Use props as a parameter 
export default function recipepreview (props) {
    return (
        //Copying styles from the styles we have to find
        //Take div component styles
        //Called styles bc that's what we imported 
    <div className={styles.recipepreview}>
        <div className={styles.link}>
            <a>
            <div className={styles.left}>
                <h1 className={styles.title}>{props.title}</h1>
                <div className={styles.author}>
                    <img src={props.avatar} alt="" height={24} width={24} />
                    <p>{props.author}</p>
                </div>
            </div>
            <div className={styles.right}>
                <div  className={styles.thumbnail}>
                <img height={112} width={83} src={props.thumbnail} alt="" className={styles.thumbnailcontent} />
                </div>
            </div>
            </a>
        </div>

        <div className={styles.divider}></div>
    </div>
    )
}
