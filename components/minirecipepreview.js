import styles from '../styles/recipepreview.module.css'
import recipe_thumbnail from '../assets/recipe_thumbnail.png'
import next from 'next'
import react from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useNavigate} from 'next/router';


import recipepage from '../pages/recipe_page/[id]'
import { isDynamicRoute } from 'next/dist/shared/lib/router/utils';

//All components export a default function 
//Functions have uppercase function name

const read_message = async (token, message_id) => {
    fetch("https://dev.createforever.media/api:lSOVAmsS/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gift_ledger_id: message_id,
      }),
    }).then((response) => console.log(response));
  };

//Use props as a parameter 
export default function minirecipepreview (props) {

    return (
        //Copying styles from the styles we have to find
        //Take div component styles
        //Called styles bc that's what we imported 
    <div className={styles.minirecipepreview}
    >
                <div className={styles.minidivider}></div>

        <a className={styles.link}>
            <a className={styles.wholemini}>
            <div className={styles.minileft}>
                <h1 className={styles.minititle}>{props.title}</h1>
                <div className={styles.miniauthor}>
                    <Image src={props.avatar} alt="" height={16} width={16}/>
                    <p className={styles.author_profile_mini}>{props.author}</p>
                </div>
            </div>
            <div className={styles.miniright}>
                <div  className={styles.minithumbnail}>
                <img src={props.thumbnail} alt="" className={styles.minithumbnailcontent} />
                </div>
            </div>
            </a>
        </a>

    </div>
    )
}
