//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router";
//import list_of_recipes from "../../recipes.json";
import styles from "../../styles/recipeview.module.css";
import Image from "next/image";
import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";
import ShareButton from "../../components/share_button";
import getSelf from "../../lib/getSelf";
import GiftButton from "../../assets/gift.svg"
import closeButton from "../../assets/closeicon.svg"
import backButton from "../../assets/back.svg"
export const ShareState = {
  Default: "Default",
  Gifting: "Gifting",
  Gifted: "Gifted",
  Failed: "Failed",
};

export async function getServerSideProps(context) {
  const token = context.req?.cookies?.token;

  if (!token)
    return {
      redirection: {
        destination: "/login",
        permanent: false,
      },
    };

  const user = await getSelf(token);

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
    props: { selected_recipe, id, user_list, user }, // will be passed to the page component as props
  };
}

//Start of recipe page component
export default function Recipe(props) {
  const router = useRouter();
  const upload_change = async () => {
    fetch("https://dev.createforever.media/api:lSOVAmsS/recipes/" + recipe_id, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        recipe_name: myrecipename.current.innerText,
        recipe_thumbnail: props.selected_recipe.recipe_thumbnail,
        recipe_author: props.selected_recipe.recipe_author,
        recipe_description: mydescriptionname.current.innerText,
        shared_with: props.selected_recipe.shared_with,
        ingredients: ingredients.map((ingredient) => ingredient),
        directions: directions.map((direction) => direction),
        tags: props.tags,
      }),
    }).then((response) => console.log(response));
    console.log(recipe_id);
    console.log(myrecipename.current.innerText);
    console.log(props.selected_recipe.recipe_thumbnail?.url);
    console.log(props.selected_recipe.recipe_author);
    console.log(mydescriptionname.current.innerText);
    console.log(props.selected_recipe.shared_with);
    console.log(ingredients.map((ingredient) => ingredient));
    console.log(directions.map((direction) => direction));
    router.push("/");
  };
  const myrecipename = useRef(null);
  const mydescriptionname = useRef(null);

  const [title, setTitle] = useState(props.selected_recipe.recipe_name);

  const [directions, setDirections] = useState(
    props.selected_recipe.directions
  );

  const [ingredients, setIngredients] = useState(
    props.selected_recipe.ingredients
  );

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
        {props.user.id == props.selected_recipe.recipe_author ? (
          <a onClick={upload_change} className={styles.backbutton}>
            <Image
              src={backButton}
              width={24}
              height={24}
              alt=""
              className={styles.backbutton}
            />
          </a>
        ) : (
          <a href=" / " className={styles.backbutton}>
            <Image
              src={backButton}
              width={24}
              height={24}
              alt=""
              className={styles.backbutton}
            />
          </a>
        )}
        <p>{title}</p>
        {/*         {(props.user.id == props.selected_recipe.recipe_author)? 
        <a className={styles.giftIconButton} href={`/create_recipe/form`}>
        <img className={styles.giftIcon} src="https://svgshare.com/i/gJH.svg" />
        </a>
        : null            
        }
 */}

        <a
          className={styles.giftIconButton}
          onClick={() => setModalIsOpen(true)}
        >
          <Image
          width={32}
          height={32}
            className={styles.giftIcon}
            src={GiftButton}
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
            top: "86px",
            right: "16px",
            left: "100px",
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
            "z-index": "150",
          },
        }}
      >
        <div className={styles.modalTop}>
          <p className={styles.modalTopText}>Gift this Recipe</p>
          <a
            className={styles.modalTopButton}
            onClick={() => setModalIsOpen(false)}
          >
            <Image
              width={24}
              height={24}
              className={styles.giftIcon}
              src={closeButton}
              alt="Close Modal"
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
      {props.user.id == props.selected_recipe.recipe_author ? (
        <h1
          contentEditable
          className={styles.title}
          ref={myrecipename}
          onKeyUp={(e) => {
            console.log(title);
            setTitle(e.target.innerText);
          }}
        >
          {props.selected_recipe.recipe_name}
        </h1>
      ) : (
        <h1 ref={myrecipename} className={styles.title}>
          {props.selected_recipe.recipe_name}
        </h1>
      )}
      <div className={styles.author}>
        <div className={styles.authorimg}>
        <Image width={128} height={128}  className={styles.authorimg} src={identify_author.profile_picture?.url} alt="" />
        </div>
        <p>{identify_author.name}</p>
      </div>
      {props.user.id == props.selected_recipe.recipe_author ? (
        <p
          contentEditable
          className={styles.description}
          ref={mydescriptionname}
        >
          {props.selected_recipe.recipe_description}
        </p>
      ) : (
        <p className={styles.description} ref={mydescriptionname}>
          {props.selected_recipe.recipe_description}
        </p>
      )}
      <h2 className={styles.section_title}>Ingredients</h2>
      {props.user.id == props.selected_recipe.recipe_author
        ? props.selected_recipe.ingredients.map((item, index) => {
            return (
              <li key={index} className={styles.recipe_ingredients}>
                <span
                  className={styles.recipe_ingredient}
                  contentEditable
                  onKeyUp={(e) => {
                    console.log(ingredients);
                    setIngredients((current_ingredients) => {
                      const copy_of_current = [...current_ingredients];
                      copy_of_current[index] = e.target.innerText;
                      return copy_of_current;
                    });
                  }}
                >
                  {item}
                </span>
              </li>
            );
          })
        : props.selected_recipe.ingredients.map((item, index) => {
            return (
              <li key={index} className={styles.recipe_ingredients}>
                {item}
              </li>
            );
          })}
      <h2 className={styles.section_title}>Directions</h2>
      {props.user.id == props.selected_recipe.recipe_author ? (
        <ol type="1">
          {props.selected_recipe.directions.map((item, index) => {
            return (
              <li key={index} className={styles.recipe_directions}>
                <span
                  className={styles.recipe_direction}
                  contentEditable
                  onKeyUp={(e) => {
                    console.log(directions);
                    setDirections((current_directions) => {
                      const copy_of_current = [...current_directions];
                      copy_of_current[index] = e.target.innerText;
                      return copy_of_current;
                    });
                  }}
                >
                  {item}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <ol type="1">
          {props.selected_recipe.directions.map((item, index) => {
            return (
              <li key={index} className={styles.recipe_directions}>
                {item}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
