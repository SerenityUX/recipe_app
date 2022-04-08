//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router";
//import list_of_recipes from "../../recipes.json";
import styles from "../../styles/recipeview.module.css";
import Image from "next/image";
import Modal from "react-modal";
import React, { useState } from "react";
import ShareButton from "../../components/share_button";


export const ShareState = {
  Default: "Default",
  Gifting: "Gifting",
  Gifted: "Gifted",
  Failed: "Failed",
};

export async function getServerSideProps(context) {

  
  const { id } = context.params;
  const user_response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/users"
  );
  const user_list = await user_response.json();

  const response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/recipes/" + id
  );
  const selected_recipe = await response.json();
  //console.log(selected_recipe)

  return {
    props: { selected_recipe, id,user_list }, // will be passed to the page component as props
  };
}

//Start of recipe page component
export default function Recipe(props) {

  const recipe_id = props.id;
  const [isSharing, setIsSharing] = useState(ShareState.Default);
  const [email, setEmail] = useState("");

  const GiftBody = {
    email: email,
    recipe_id: recipe_id,
    //Not sure I can do ""
  };

  const attemptToGift = async () => {
    setIsSharing(ShareState.Gifting);

    const response = await fetch(
      "https://dev.createforever.media/api:lSOVAmsS/gift",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          recipes_id: recipe_id,
        }),
      }
    );

    console.log(email);
    console.log(recipe_id);
    console.log(response);
    if (response.status == 200) {
      setIsSharing(ShareState.Gifted);
    } else {
      setIsSharing(ShareState.Failed);
    }
  };
  //The default value is false
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const identify_author = props.user_list.find(
    (user) => user.id == props.selected_recipe.recipe_author
  );
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
        <a href=" / ">
          <img src="https://i.ibb.co/SVPT9Yn/backbutton.png" alt="" />
        </a>
        <p>{props.selected_recipe.recipe_name}</p>
        <a
          className={styles.giftIconButton}
          onClick={() => setModalIsOpen(true)}
        >
          <img
            className={styles.giftIcon}
            src="https://i.ibb.co/xjkJTn5/gift.png"
            alt="Gift"
          />
        </a>
      </div>
      <Modal
        className={styles.shareModal}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        preventScroll={true}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.0)",
          },
          content: {
            "border-radius": "12px",
            position: "absolute",
            top: "40px",
            left: "max-content",
            bottom: "40px",
            border: "none",
            background: "#F1F3F4",
            "min-width": "70vw",
            "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
            overflow: "none",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "16px",
            height: "200px",
          },
        }}
      >
        <div className={styles.modalTop}>
          <p className={styles.modalTopText}>Gift this Recipe</p>
          <a
            className={styles.modalTopButton}
            onClick={() => setModalIsOpen(false)}
          >
            <img
              className={styles.giftIcon}
              src="https://i.ibb.co/DCYgfwk/close-black-24dp-5-1.png"
              alt="Gift"
            />
          </a>
        </div>
        <div className={styles.inputgroup}>
          <label className={styles.inputlabel}>Email Address</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
            name="email"
          ></input>
        </div>
        <ShareButton
          className={styles.loginbutton}
          value={isSharing}
          onClick={attemptToGift}
        ></ShareButton>
      </Modal>
      <div
        src={props.selected_recipe.recipe_thumbnail?.url}
        className={styles.thumbnail}
        alt=""
      >
        
        <img
        className={styles.thumbnailcontent}
        src={props.selected_recipe.recipe_thumbnail?.url}
        ></img>
      </div>
      <h1 className={styles.title}>{props.selected_recipe.recipe_name}</h1>
      <div className={styles.author}>
        <img src={identify_author.profile_picture?.url} alt="" />
        <p>{identify_author.name}</p>
      </div>
      <p className={styles.description}>
        {props.selected_recipe.recipe_description}
      </p>
      <h2 className={styles.section_title}>Ingredients</h2>
      {props.selected_recipe.ingredients.map((item, index) => {
        return (
          <li key={index} className={styles.recipe_ingredients}>
            {item}
          </li>
        );
      })}
      <h2 className={styles.section_title}>Directions</h2>
      <ol type="1">
        {props.selected_recipe.directions.map((item, index) => {
          return (
            <li key={index} className={styles.recipe_directions}>
              {item}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
