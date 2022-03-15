
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
      <form className={styles.form}>
    <div className={styles.container}>
      <main className={styles.main}>
        <a href=" / ">back button</a>
        <p>Create a recipe</p>
      <label>
        Create a new recipe
      </label>
      <input
      value ={values.name}
      className={styles.input}
      onChange={handlenameInputChange}
      placeholder="Input recipe title"
      name="recipe name"
      />
      <input
      value ={values.description}
      className={styles.input}
      onChange={handledescriptionInputChange}
      placeholder="Input description"
      name="recipe description"
      />

      <input
      value ={values.tags}
      className={styles.input}
      onChange={handleTagsInputChange}
      placeholder="Input tags"
      name="recipe tags"
      />

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