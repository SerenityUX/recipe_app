
import styles from '../../styles/createrecipe.module.css'

import next from 'next'
import React, { useState, useEffect } from 'react'

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies", "Snacks", "Juices"]
//e stands for event. When you do keyup you get the event passed in to it 


const Form = () => {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if(images.length < 1) return;

    const newImagesUrls = [];
    images.forEach(image => newImagesUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImagesUrls);
  }, [images])

  const [values, setValues] = useState({
    recipe_name: "",
    recipe_thumbnail: "",
    recipe_author: "",
    recipe_description: "",
    shared_with: "",
    ingredients: "",
    directions: "",
    tags: "",
    author: ""
  });

const handlenameInputChange = (event) => {
  setValues({... values, name: event.target.value})
}

const handledescriptionInputChange = (event) => {
  setValues({... values, description: event.target.value})
}
const handleIngredientsInputChange = (event) => {
  setValues({... values, ingredients: event.target.value})
}

const handleDirectionsInputChange = (event) => {
  setValues({... values, directions: event.target.value})
}
const handleTagsInputChange = (event) => {
  setValues({... values, tags: event.target.value})
}

const handleThumbnailChange = (event) => {
  setValues({... values, tags: event.target.value})
  setImages([...event.target.files]);
}

const uploadImageToClient = (event) => {
  if (event.target.files && event.target.files[0]) {
      setImages((imageList) => [...imageList, event.target.files[0]]);
      setImageURLS((urlList) => [
          ...urlList,
          URL.createObjectURL(event.target.files[0])
      ]);
  }
};
  return (
    <div className={styles.form_container}>
    <div className={styles.top_bar}>
    <a href=" / "><img src="https://i.ibb.co/SVPT9Yn/backbutton.png" alt=""/></a>
    <p>Create a recipe</p>
    </div>
      <form className={styles.form} autoComplete="off">
      <label className={styles.thumbnail}>
        <div className={styles.upload_container}>
          <img src={imageURLs[0]} className={styles.thumbnail_preview}/>
          <img src = "https://i.ibb.co/TRYVf5F/icon.png"></img> <p>Upload Image</p>
        </div>
      <input type="file" accept="image/*" className={styles.upload_image} onChange={handleThumbnailChange}>
      </input>
      </label>
    <div className={styles.container}>
      <main className={styles.main}>

      <span name="title" onChange={handlenameInputChange} className={styles.input_title_span} contentEditable>
      </span>

      <span name="description" className={styles.input_description_span} contentEditable>
      </span>
      <h2 className={styles.section_title}>Tags</h2>
      <span name="tags" className={styles.input_tags_span} contentEditable>
      </span>
      <h2 className={styles.section_title}>Ingredients</h2>
      <span name="ingredients" className={styles.input_ingredients_span} contentEditable>
      </span>
      <h2 className={styles.section_title}>Directions</h2>
      <span name="directions" className={styles.input_directions_span} contentEditable>
      </span>
    <button className={styles.submit_button}>Submit</button>
      </main>
    </div>
      </form>
    </div>
  )
}

export default Form