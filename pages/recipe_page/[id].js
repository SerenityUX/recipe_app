//Import router hook (a function that lets one access internal routing of next js)
import { useRouter } from "next/router";
//import list_of_recipes from "../../recipes.json";
import styles from "../../styles/recipeview.module.css";
import Image from "next/image";
import Modal from "react-modal";
import React, { useState, useEffect, useRef } from "react";
import ShareButton from "../../components/share_button";
import SmartText from "../../components/smart_text";
import getSelf from "../../lib/getSelf";
import GiftButton from "../../assets/gift.svg";
import closeButton from "../../assets/closeicon.svg";
import backButton from "../../assets/back.svg";
import nearby from "../../assets/nearby.svg";
import mylogo from "../../assets/logo.svg";

import QR from "../../assets/QR.svg";
import { QRCode } from 'react-qrcode-logo';

import email_icon from "../../assets/email.svg";
import { Howl, Howler } from "howler";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0.01, r: 30, stroke: "#ffffff" },
  visible: (i) => {
    const delay = 0.01 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      stroke: "#43AA8B",
      r: 35.5,
      transition: {
        pathLength: {
          delay: 0,
          type: "tween",
          duration: 1.25,
          damping: 10,
          mass: 0.75,
          stiffness: 100,
        },
        stroke: { delay: 1.5, type: "spring", duration: 0.5 },
        opacity: { delay: 0, duration: 0.5 },
        r: { delay: 1.5, duration: 0.5 },
      },
    };
  },
};

export const ShareState = {
  Default: "Default",
  Gifting: "Gifting",
  Gifted: "Gifted",
  Failed: "Failed",
};

export const ClaimState = {
  Default: "Add to Meal Pack",
  Gifting: "Adding Recipe",
  Gifted: "Recipe Added to Meal Pack",
  Failed: "Recipe Transfer Failed",
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

  const user_relationships_response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/get_user_relations",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const user_relationships = await user_relationships_response.json();

  const nearby_users_response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/get_nearby_users",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const nearby_users = await nearby_users_response.json();

  const user_response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/users"
  );

  const user_list = await user_response.json();

  const first_response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/recipes/" + id,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const second_response = await fetch(
    "https://dev.createforever.media/api:lSOVAmsS/temprecipes/" + id,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  
  if(first_response.status == 403) {
    var status = "temporary"
    var selected_recipe = await second_response.json()
  } else {
    var selected_recipe = await first_response.json()
    var status = "nottemporary"
  }



  return {
    props: {
      selected_recipe,
      id,
      user_list,
      user,
      user_relationships,
      token,
      nearby_users,
      status
    }, // will be passed to the page component as props
  };
}

//Start of recipe page component
export default function Recipe(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingnearby, setLoadingNearby] = useState([]);
  const SuggestHandler = (text) => {
    setEmail(text);
    setSuggestions([]);
  };
  const handleChanges = async (email_value, relations) => {
    const test_attempt = relations.user_relationships.map((item) => item);
    const relations_setup = relations.user_relationships.map(
      (item) => item.email
    );

    const test = relations_setup.filter((item) => {
      if (
        item.toLowerCase().trim().includes(email_value.toLowerCase().trim())
      ) {
        return item;
      }
    });

    setSuggestions(test);
    setEmail(email_value);
  };
  //Input of autocomplete ends

  const router = useRouter();

  useEffect(() => {
    if (props.selected_recipe.shared_with.indexOf(props.user.id) == -1) {
      console.log("no permission");
    }
  }, []);


  const upload = async (result) => {


    const response = await fetch(
      "https://dev.createforever.media/api:lSOVAmsS/share_with_id",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          users_id: props.user.id,
          recipes_id: result,
        }),
      }
    ).then((res) => res.json());

    router.push("/recipe_page/" + response.id).then(() => {
      alert(response.recipe_name + " added to Meal Pack")
    }
    )    
  }

  const upload_change = async () => {
    fetch("https://dev.createforever.media/api:lSOVAmsS/recipes/" + recipe_id, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `Bearer ${props.token}`,
      },
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
    router.back();
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

  const recipe_id = props.selected_recipe.id;
  const [isSharing, setIsSharing] = useState(ShareState.Default);
  const [isClaiming, setIsClaiming] = useState(ClaimState.Default);
  const [email, setEmail] = useState("");
  const [shareCode, setShareCode] = useState("");
    //Math.random().toString(36).substring(2,20);

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
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

  const attemptToGiftNearby = async (users_email) => {
    const response = await fetch(
      "https://dev.createforever.media/api:lSOVAmsS/gift",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          email: users_email,
          recipes_id: recipe_id,
        }),
      }
    );

    if (response.status == 200) {
      console.log("worked");
    } else {
      console.log("failed");
    }
  };
  //The default value is false
  const [QRmodalIsOpen, setQRModalIsOpen] = useState(false);
  const [emailmodalIsOpen, setEmailModalIsOpen] = useState(false);
  const [selectionmodalIsOpen, setSelectionModalIsOpen] = useState(false);
  const [nearbymodalIsOpen, setNearbyModalIsOpen] = useState(false);

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
    <div>
      {props.selected_recipe.shared_with.indexOf(props.user.id) !== -1 || props.status == "temporary" ? (
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
              <a onClick={() => router.back()} className={styles.backbutton}>
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
          {props.status !== "temporary" ? (
            <a
              className={styles.giftIconButton}
              onClick={() => {
                setSelectionModalIsOpen(true);
                setEmailModalIsOpen(false);
                setNearbyModalIsOpen(false);
              }}
            > 
              <Image
                width={32}
                height={32}
                className={styles.giftIcon}
                src={GiftButton}
                alt="Gift"
              />
            </a> ) : 
                        <a
                        className={styles.redeemText}
                        onClick={() => {
                          upload(props.selected_recipe.id)
                        }}
                      > 
                        Redeem
                      </a>
            }
            
          </div>
          
          <Modal
            className={styles.shareModal}
            isOpen={selectionmodalIsOpen}
            onRequestClose={() => setSelectionModalIsOpen(false)}
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
                left: "calc(45vw - 16px)",
                right: "16px",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                width: "55vw",
                "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "0px",
                height: "fit-content",
                "z-index": "150",
                cursor: "pointer",
              },
            }}
          >
            <div className={styles.modalTopSelection}>
              <div
                className={styles.modalOption}
                onClick={() => {
                  setSelectionModalIsOpen(false);
                  setEmailModalIsOpen(true);
                }}
              >
                <p className={styles.modalTopText}> Gift by Email</p>
                <Image
                  width={24}
                  height={24}
                  className={styles.giftsubIcon}
                  src={email_icon}
                  alt="Gift Email"
                />
              </div>

              <div className={styles.smalldivider}></div>
              <div
                className={styles.modalOption}
                onClick={() => {
                  setSelectionModalIsOpen(false);
                  setNearbyModalIsOpen(true);
                }}
              >
                <p className={styles.modalTopText}> Gift Nearby</p>
                <Image
                  width={24}
                  height={24}
                  className={styles.giftsubIcon}
                  src={nearby}
                  alt="Gift Nearby"
                />
              </div>
              <div className={styles.smalldivider}></div>

              <div
                className={styles.modalOption}
                onClick={() => {
                  const response = fetch(
                    "https://dev.createforever.media/api:lSOVAmsS/share_codes",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.token}`,
                      },
                      body: JSON.stringify({
                        share_code: Math.random().toString(36).substring(2,20) + Math.random().toString(36).substring(2,20) + Math.random().toString(36).substring(2,20) + Math.random().toString(36).substring(2,20) + Math.random().toString(36).substring(2,20) + Math.random().toString(36).substring(2,20),
                        recipes_id: recipe_id,
                      }),
                    }
                  ).then((res) => res.json()).then((jsoned) => setShareCode(jsoned.share_code)).then((jsonedo) => setQRModalIsOpen(true));
                  setSelectionModalIsOpen(false)
                }}
              >
                <p className={styles.modalTopText}> Gift by QR Code</p>
                <Image
                  width={24}
                  height={24}
                  className={styles.giftsubIcon}
                  src={QR}
                  alt="Gift Email"
                />
              </div>
            </div>
            
          </Modal>

          <Modal
            className={styles.shareModal}
            isOpen={emailmodalIsOpen}
            onRequestClose={() => setEmailModalIsOpen(false)}
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
                left: "calc(30vw-16px)",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                width: "70vw",
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
                onClick={() => setEmailModalIsOpen(false)}
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
                autoComplete="off"
                onChange={(event) => {
                  handleChanges(event.target.value, props.user_relationships);
                  setIsSharing(ShareState.Default);
                }}
                type="email"
                id="email"
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 900);
                }}
                name="email"
              ></input>
              <div className={styles.suggestions}>
                {suggestions &&
                  suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className={styles.suggestion}
                      onClick={() => SuggestHandler(suggestion)}
                    >
                      <p key={i} className={styles.top_section}>
                        {suggestion}
                      </p>
                      <div className={styles.bottom_section}>
                        <img
                          className={styles.small_suggestion_icon}
                          src={
                            props.user_relationships.user_relationships.map(
                              (item) => item
                            )[
                              props.user_relationships.user_relationships.findIndex(
                                (e) => e.email === suggestion
                              )
                            ].profile_picture.url
                          }
                        ></img>
                        <p className={styles.small_suggestion_name}>
                          {
                            props.user_relationships.user_relationships.map(
                              (item) => item
                            )[
                              props.user_relationships.user_relationships.findIndex(
                                (e) => e.email === suggestion
                              )
                            ].name
                          }
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <ShareButton
              className={styles.loginbutton}
              value={isSharing}
              onClick={attemptToGift}
            ></ShareButton>
          </Modal>

          <Modal
            className={styles.shareModal}
            isOpen={nearbymodalIsOpen}
            onRequestClose={() => setNearbyModalIsOpen(false)}
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
                left: "calc(25vw-16px)",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                "max-width": "75vw",
                "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "16px 16px 16px 16px",
                "min-height": "fit-content",
                height: "fit-content",
                "z-index": "150",
              },
            }}
          >
            <div className={styles.modalTop}>
              <p className={styles.modalTopText}>Gift this Recipe</p>
              <a
                className={styles.modalTopButton}
                onClick={() => {
                  setNearbyModalIsOpen(false);
                  console.log(props.nearby_users);
                }}
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
            {props.nearby_users.length === 0 ? (
              <div>
                <p>There are no nearby users who have enabled this feature</p>
                <a
                  className={styles.modalA}
                  onClick={() => {
                    setNearbyModalIsOpen(false);
                    setEmailModalIsOpen(true);
                    console.log(props.nearby_users);
                  }}
                >
                  Share using email address
                </a>
              </div>
            ) : (
              <div className={styles.group_of_nearby_users}>
                {props.nearby_users &&
                  props.nearby_users.map((user, i) => (
                    <div
                      key={i}
                      className={styles.individual_nearby}
                      onClick={() => {
                        setLoadingNearby((loadingnearby) => [
                          ...loadingnearby,
                          user.id,
                        ]);
                        console.log(loadingnearby);
                        attemptToGiftNearby(user.email, recipe_id);
                      }}
                    >
                      <div key={i} className={styles.stack_profile_pic}>
                        <img
                          key={i}
                          className={styles.nearby_profile_icon}
                          src={user.profile_picture.url}
                        ></img>
                        <div key={i} data-isOn={loadingnearby}>
                          {loadingnearby.includes(user.id) ? (
                            <motion.svg
                              width="76"
                              height="76"
                              viewBox="0 0 76 76"
                              initial="hidden"
                              animate="visible"
                              className={styles.nearbyCircleLarge}
                            >
                              <motion.circle
                                className={styles.nearbyCircle}
                                cx="38"
                                cy="38"
                                variants={draw}
                                custom={i}
                                key={i}
                              />
                            </motion.svg>
                          ) : null}
                        </div>
                      </div>
                      <p key={i} className={styles.nearby_name}>
                        {user.name}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </Modal>


          <Modal
            className={styles.shareModal}
            isOpen={QRmodalIsOpen}
            onRequestClose={() => setQRModalIsOpen(false)}
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
                left: "calc(25vw-16px)",
                bottom: "40px",
                border: "none",
                background: "#F1F3F4",
                "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.5)",
                overflow: "none",
                WebkitOverflowScrolling: "touch",
                outline: "none",
                padding: "16px 16px 16px 16px",
                height: "365px",
                "z-index": "150",
                "width": "290px"
              },
            }}
          >
            <div>
            <div className={styles.modalTop}>
              <p className={styles.modalTopText}>Scannable Recipe</p>
              <a
                className={styles.modalTopButton}
                onClick={() => {
                  setQRModalIsOpen(false);
                  console.log(props.nearby_users);
                }}
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

              <div>
                {/* <p>{props.user.name} created this scannable recipe code for you</p> */}
                <div className={styles.qrCode}>
                <QRCode className={styles.qrCodeActual} value={shareCode} logoImage={mylogo.src}  logoOpacity={1} size={249} bgColor={"#f1f3f4"} quietZone={0} enableCORS={true} removeQrCodeBehindLogo={true} eyeRadius={200} qrStyle={"dots"} fgColor={"#2874E8"} onClick={() => {
                  console.log(shareCode)
                }}/>
                </div>
                <p className={styles.subtext}>Scan with Meal Pack Scanner</p>              </div>
            </div>
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
            <img
              className={styles.authorimg}
              src={identify_author.profile_picture?.url}
              alt=""
            />

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
                      <SmartText value={item}></SmartText>
                    </span>
                  </li>
                );
              })
            : props.selected_recipe.ingredients.map((item, index) => {
                return (
                  <li key={index} className={styles.recipe_ingredients}>
                    <SmartText value={item}></SmartText>
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
                    <SmartText value={item}></SmartText>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      ) : (
        <p>Invalid Permission</p>
      )}
    </div>
  );
}
