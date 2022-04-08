import styles from "../../styles/createrecipe.module.css";
import { generate } from "shortid";
import next from "next";
import React, { useState, useEffect, useRef } from "react";
import { produce } from "immer";
import axios from "axios";
import { rootCertificates } from "tls";
import SubmitButton from '../../components/submit_button'
import Cookies from 'universal-cookie';
import getSelf from "../../lib/getSelf";

export async function getServerSideProps(context) {
  try {
    const token = context.req?.cookies?.token
    if (!token) return {
      redirection: {
        destination: '/login',
        permanent: false,
      }
    }
    const user = await getSelf( token )
    return { props: { 
      user
    } };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    }
  }
}





export enum UploadState {
  Default = "Default",
  Uploading = "Uploading",
  Uploaded = "Uploaded",
  Failed = "Failed"
}

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Smoothies",
  "Snacks",
  "Juices",
];

interface Tag {
  id: string;
  tag: string;
}

interface Ingredient {
  id: string;
  ingredient: string;
}

interface Direction {
  id: string;
  direction: string;
}


/* const token = context.req?.cookies?.token;
if (!token) return { 
redirect: {
destination: '/login',
permanent: false,
  } 
}
const user = getSelf( token )
user_id = user.id
 */
const Form = ({user}) => {


  let btnRef = useRef(null);
  const myrecipename = useRef(null);
  const mydescriptionname = useRef(null);
  const [tags, setTags] = useState<Tag[]>([
    /*     { id: "5", tag: "test" },
    { id: "6", tag: "value" }, */
  ]);
  const [directions, setDirections] = useState<Direction[]>([
    /*     { id: "5", direction: "test" },
    { id: "6", direction: "value" }, */
  ]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    /*     { id: "5", ingredient: "test" },
    { id: "6", ingredient: "value" }, */
  ]);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  

  useEffect(() => {
    // console.log(images);
    if (images.length < 1) return;

    const newImagesUrls = [];
    images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImagesUrls);
  }, [images]);

  const [values, setValues] = useState({
    recipe_name: "",
    recipe_thumbnail: "",
    recipe_author: user.id,
    recipe_description: "",
    shared_with: user.id,
  });

  /*   const handlenameInputChange = (event) => {
    setValues({ ...values, recipe_name: event.target.value });
  };

  const handledescriptionInputChange = (event) => {
    setValues({ ...values, recipe_description: event.target.value });
  }; */

  const handleThumbnailChange = (event) => {
    console.log(event.target.files[0]);

    // console.log(event.target.files[0]);
    setImages([...event.target.files]);
  };

  const upload = async () => {
    
    console.log(UploadState)
    if (isUploading == UploadState.Default || isUploading == UploadState.Failed) {
    setIsUploading( UploadState.Uploading )
      
    //setValues({...values, recipe_name})
    //Object.defineProperty(images[0], 'path', {value:URL.createObjectURL(images[0]), writable: true});
    // console.log(images);
    const reader = new FileReader();

/*     const data = {
      recipe_name: myrecipename.current.innerText,
      recipe_thumbnail: imageURLs[0],
      recipe_author: values.recipe_author,
      recipe_description: mydescriptionname.current.innerText,
      shared_with: values.shared_with,
      ingredients: ingredients.map((ingredient) => ingredient.ingredient),
      directions: directions.map((direction) => direction.direction),
      tags: tags.map((tag) => tag.tag),
    }; */
    //console.log([{...images[0],path: URL.createObjectURL(images[0])}])
    //console.log(myrecipename.current.innerText);
    //console.log(mydescriptionname.current.innerText);
    //console.log({ ...images[0], path: URL.createObjectURL(images[0]) });
    
    let formData = new FormData();
    formData.append("image_url", images[0]);
    
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(
        "https://dev.createforever.media/api:lSOVAmsS/upload/image?tpl=original",
        formData,
        config
      )
      .then((response) => {
        console.log("IT WORKED")
        console.log(response.data.image);
        fetch("https://dev.createforever.media/api:lSOVAmsS/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            recipe_name: myrecipename.current.innerText,
            recipe_thumbnail: response.data.image,
            recipe_author: values.recipe_author,
            recipe_description: mydescriptionname.current.innerText,
            shared_with: values.shared_with,
            ingredients: ingredients.map((ingredient) => ingredient.ingredient),
            directions: directions.map((direction) => direction.direction),
            tags: tags.map((tag) => tag.tag),
          }),
        }).then((response) => {
          console.log(response);
          setIsUploading( UploadState.Uploaded )
          //let button_text = "Submitted"
        });
      })
      .catch((error) => {
        console.log(error);
        setIsUploading( UploadState.Failed )
        //let button_text = "Failed"
      });

  

/*    


    console.log(images[0]);
    fetch("https://dev.createforever.media/api:lSOVAmsS/upload/image", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
      body: JSON.stringify({
        image_url: imageURLs[0],
      }),
    }).then((output) => {
      console.log(output);
      fetch("https://dev.createforever.media/api:lSOVAmsS/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({
          recipe_name: myrecipename.current.innerText,
          recipe_thumbnail: output,
          recipe_author: values.recipe_author,
          recipe_description: mydescriptionname.current.innerText,
          shared_with: values.shared_with,
          ingredients: ingredients.map((ingredient) => ingredient.ingredient),
          directions: directions.map((direction) => direction.direction),
          tags: tags.map((tag) => tag.tag),
        }),
      }).then((response) => {
        console.log(response);
      });
    });*/
  }
  };
 
  const uploadImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImages((imageList) => [...imageList, event.target.files[0]]);
      setImageURLs((urlList) => [
        ...urlList,
        URL.createObjectURL(event.target.files[0]),
      ]);
    }
  };

  const [isUploading, setIsUploading] = useState<UploadState>(UploadState.Default)
  const [disable, setDisable] = React.useState(false);

  return (
    <div className={styles.form_container}>
      <div className={styles.top_bar}>
        <a href=" / ">
          <img src="https://i.ibb.co/SVPT9Yn/backbutton.png" alt="" />
        </a>
        <p>Create a recipe</p>
      </div>
      <div
        className={styles.form}
      >
        <label className={styles.thumbnail}>
          <div className={styles.upload_container}>
            <img src={imageURLs[0]} className={styles.thumbnail_preview} />
            <img src="https://i.ibb.co/TRYVf5F/icon.png"></img>{" "}
            <p>Upload Image</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className={styles.upload_image}
            onChange={handleThumbnailChange}
          ></input>
        </label>
        <div className={styles.container}>
          <span
            className={styles.input_title_span}
            ref={myrecipename}
            contentEditable
          ></span>
          <span
            className={styles.input_description_span}
            contentEditable
            ref={mydescriptionname}
          ></span>
          <h2 className={styles.section_title}>Tags</h2>
          <div>
            <ul className={styles.ordered_list}>
              {tags.map((p) => {
                return (
                  <li className={styles.entire_input} key={p.id}>
                    <input autoFocus
                      className={styles.input_file_list}
                      value={p.tag}
                      placeholder="Enter a tag"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setTags((currentTags) => [
                            ...currentTags,
                            {
                              id: generate(),
                              tag: "",
                            },
                          ]);
                        }
                      }}
                      onChange={(e) => {
                        const tag = e.target.value;
                        setTags((currentTags) =>
                          currentTags.map((x) =>
                            x.id === p.id
                              ? {
                                  ...x,
                                  tag,
                                }
                              : x
                          )
                        );
                        //e.target.value
                      }}
                    ></input>

                    <img
                      src="https://i.ibb.co/SV1vzR6/delete-black-24dp-2-1.png"
                      onClick={() => {
                        setTags((currentTags) =>
                          currentTags.filter((x) => x.id !== p.id)
                        );
                      }}
                    ></img>
                  </li>
                );
              })}
            </ul>
            <span
              className={styles.input_tags_span}
              onClick={() => {
                setTags((currentTags) => [
                  ...currentTags,
                  {
                    id: generate(),
                    tag: "",
                  },
                ]);
              }}
            >
              Insert a recipe tag
            </span>
          </div>
          <h2 className={styles.section_title}>Ingredients</h2>
          <div>
            <ol className={styles.ordered_list}>
              {ingredients.map((i) => {
                return (
                  <li className={styles.entire_input} key={i.id}>
                    <input autoFocus
                      className={styles.input_file_list}
                      value={i.ingredient}
                      placeholder="Enter an ingredient"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setIngredients((currentIngredients) => [
                            ...currentIngredients,
                            {
                              id: generate(),
                              ingredient: "",
                            },
                          ]);
                        }
                      }}
                      onChange={(e) => {
                        const ingredient = e.target.value;
                        setIngredients((currentIngredients) =>
                          currentIngredients.map((x) =>
                            x.id === i.id
                              ? {
                                  ...x,
                                  ingredient,
                                }
                              : x
                          )
                        );
                        //e.target.value
                      }}
                    ></input>

                    <img
                      src="https://i.ibb.co/SV1vzR6/delete-black-24dp-2-1.png"
                      onClick={() => {
                        setIngredients((currentIngredients) =>
                          currentIngredients.filter((x) => x.id !== i.id)
                        );
                      }}
                    ></img>
                  </li>
                );
              })}
            </ol>
            <span
              className={styles.input_tags_span}
              onClick={() => {
                setIngredients((currentIngredients) => [
                  ...currentIngredients,
                  {
                    id: generate(),
                    ingredient: "",
                  },
                ]);
              }}
            >
              Insert an ingredient
            </span>
          </div>
          {/*           <span
            className={styles.input_ingredients_span}
            contentEditable
          ></span>
          <ol className={styles.ordered_list}>
            <button
              type="button"
              onClick={() => {
                setIngredients((currentIngredients) => [
                  ...currentIngredients,
                  {
                    id: generate(),
                    ingredient: "",
                  },
                ]);
              }}
            >
              add new ingredient
            </button>

            {ingredients.map((i) => {
              return (
                <li key={i.id}>
                  <input
                    className={styles.input_file_list}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        setIngredients((currentIngredients) => [
                          ...currentIngredients,
                          {
                            id: generate(),
                            ingredient: "",
                          },
                        ]);
                      }
                    }}
                    value={i.ingredient}
                    placeholder="Enter a recipe"
                    onChange={(e) => {
                      const ingredient = e.target.value;
                      setIngredients((currentIngredients) =>
                        currentIngredients.map((x) =>
                          x.id === i.id
                            ? {
                                ...x,
                                ingredient,
                              }
                            : x
                        )
                      );
                      //e.target.value
                    }}
                  ></input>
                  <p
                    onClick={() => {
                      setIngredients((currentIngredients) =>
                        currentIngredients.filter((x) => x.id !== i.id)
                      );
                    }}
                  >
                    x
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
 */}
          <h2 className={styles.section_title}>Directions</h2>
          <div>
            <ol className={styles.ordered_list}>
              {directions.map((d) => {
                return (
                  <li className={styles.entire_input} key={d.id}>
                    <input autoFocus
                      className={styles.input_file_list}
                      value={d.direction}
                      placeholder="Enter a direction"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setDirections((currentDirections) => [
                            ...currentDirections,
                            {
                              id: generate(),
                              direction: "",
                            },
                          ]);
                        }
                      }}
                      onChange={(e) => {
                        const direction = e.target.value;
                        setDirections((currentDirections) =>
                          currentDirections.map((x) =>
                            x.id === d.id
                              ? {
                                  ...x,
                                  direction,
                                }
                              : x
                          )
                        );
                        //e.target.value
                      }}
                    ></input>

                    <img
                      src="https://i.ibb.co/SV1vzR6/delete-black-24dp-2-1.png"
                      onClick={() => {
                        setDirections((currentDirections) =>
                          currentDirections.filter((x) => x.id !== d.id)
                        );
                      }}
                    ></img>
                  </li>
                );
              })}
            </ol>
            <span
              className={styles.input_tags_span}
              onClick={() => {
                setDirections((currentDirections) => [
                  ...currentDirections,
                  {
                    id: generate(),
                    direction: "",
                  },
                ]);
              }}
            >
              Insert a direction
            </span>
          </div>
          {/*         <span className={styles.input_directions_span} contentEditable></span>
        <div>
          <button
            type="button"
            onClick={() => {
              setDirections((currentDirections) => [
                ...currentDirections,
                {
                  id: generate(),
                  direction: "",
                },
              ]);
            }}
          >
            add a new direction
          </button>
          <ol className={styles.ordered_list}>
            {directions.map((d) => {
              return (
                <li key={d.id}>
                  <input
                    className={styles.input_file_list}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        setDirections((currentDirections) => [
                          ...currentDirections,
                          {
                            id: generate(),
                            direction: "",
                          },
                        ]);
                      }
                    }}
                    value={d.direction}
                    placeholder="Enter a step"
                    onChange={(e) => {
                      const direction = e.target.value;
                      setDirections((currentDirections) =>
                        currentDirections.map((x) =>
                          x.id === d.id
                            ? {
                                ...x,
                                direction,
                              }
                            : x
                        )
                      );
                      //e.target.value
                    }}
                  ></input>
                  <p
                    onClick={() => {
                      setDirections((currentDirections) =>
                        currentDirections.filter((x) => x.id !== d.id)
                      );
                    }}
                  >
                    x
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
        
 */}{" "}
 
          <SubmitButton value={isUploading} 
            onClick={() => {
              upload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
