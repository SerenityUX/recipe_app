
import styles from '../../styles/createrecipe.module.css'

import next from 'next'
import React, { useState } from 'react'

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Smoothies", "Snacks", "Juices"]


const Form = () => {
  
  const [values, setValues] = useState({
    name: "",
    description: "",
    tags: "",
    ingredients: "",
    directions: "",
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

  return (
    <div className={styles.form_container}>
    <div className={styles.top_bar}>
    <a href=" / "><img src="https://i.ibb.co/SVPT9Yn/backbutton.png" alt=""/></a>
    <p>Create a recipe</p>
    </div>
      <form className={styles.form} autocomplete="off">
      <label className={styles.thumbnail}>
        <div className={styles.upload_container}>
          <img src = "https://i.ibb.co/TRYVf5F/icon.png"></img> <p>Upload Image</p>
        </div>
      <input type="file" accept="image/*" className={styles.upload_image}>
      </input>
      </label>
    <div className={styles.container}>
      <main className={styles.main}>
      <textarea name="title" rows="14" cols="10" wrap="soft" placeholder="Input recipe title" onChange={handlenameInputChange} className={styles.input_title}>
      </textarea>
      <textarea name="description" rows="14" cols="10" wrap="soft" placeholder="Insert a recipe description." onChange={handlenameInputChange} className={styles.input_description}>
      </textarea>
      <input
      value ={values.tags}
      className={styles.input}
      onChange={handleTagsInputChange}
      placeholder="Input tags"
      name="recipe tags"
      />


      <input type="button" id="add" value="Add New"/>
      <ol id="list_item">
    
      </ol>

      <input
      value ={values.ingredients}
      className={styles.input}
      onChange={handleIngredientsInputChange}
      placeholder="Input ingredients"
      name="recipe ingredients"
      />

    <input
      value ={values.directions}
      className={styles.input}
      onChange={handleDirectionsInputChange}
      placeholder="Input directions"
      name="recipe directions"
      />

    <button>Submit</button>
      </main>
    </div>
      </form>
    </div>
  )
}

export default Form