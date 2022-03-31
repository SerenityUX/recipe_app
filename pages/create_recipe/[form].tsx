import styles from "../../styles/createrecipe.module.css";
import { generate } from "shortid";
import next from "next";
import React, { useState, useEffect } from "react";
import { produce } from "immer";
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
const Form = () => {
  const [tags, setTags] = useState<Tag[]>([
/*     { id: "5", tag: "test" },
    { id: "6", tag: "value" }, */
  ]);
  const [directions, setDirections] = useState<Direction[]>([
    { id: "5", direction: "test" },
    { id: "6", direction: "value" },
  ]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "5", ingredient: "test" },
    { id: "6", ingredient: "value" },
  ]);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;

    const newImagesUrls = [];
    images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImagesUrls);
  }, [images]);

  const [values, setValues] = useState({
    recipe_name: "",
    recipe_thumbnail: "",
    recipe_author: "",
    recipe_description: "",
    shared_with: "",
    ingredients: "",
    directions: "",
    tags: "",
    author: "",
  });

  const handlenameInputChange = (event) => {
    setValues({ ...values, recipe_name: event.target.value });
  };

  const handledescriptionInputChange = (event) => {
    setValues({ ...values, recipe_description: event.target.value });
  };
  const handleIngredientsInputChange = (event) => {
    setValues({ ...values, ingredients: event.target.value });
  };

  const handleDirectionsInputChange = (event) => {
    setValues({ ...values, directions: event.target.value });
  };
  const handleTagsInputChange = (event) => {
    setValues({ ...values, tags: event.target.value });
  };

  const handleThumbnailChange = (event) => {
    setImages([...event.target.files]);
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
  return (
    <div className={styles.form_container}>
      <div className={styles.top_bar}>
        <a href=" / ">
          <img src="https://i.ibb.co/SVPT9Yn/backbutton.png" alt="" />
        </a>
        <p>Create a recipe</p>
      </div>
      <form
        className={styles.form}
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
        }}
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
            onChange={handlenameInputChange}
            className={styles.input_title_span}
            contentEditable
          ></span>

          <span
            className={styles.input_description_span}
            contentEditable
          ></span>
          <h2 className={styles.section_title}>Tags</h2>
          <div>
            <ul className={styles.ordered_list}>
              {tags.map((p) => {
                return (
                  <li className={styles.entire_input} key={p.id}>
                    <div className={styles.input_container}>
                    <input
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
                  
                  </div>
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
          <span
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

        <h2 className={styles.section_title}>Directions</h2>
        <span className={styles.input_directions_span} contentEditable></span>
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
        <button className={styles.submit_button}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
