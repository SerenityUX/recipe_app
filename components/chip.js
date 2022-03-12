import styles from '../styles/chip.module.css'
import next from 'next'
import react from 'react'
//All components export a default function 
//Functions have uppercase function name

function select_chip() {
    console.log("You clicked a chip")
}

//Use props as a parameter 
export default function Chip (props) {
    return (
        //Copying styles from the styles we have to find
        //Take div component styles
        //Called styles bc that's what we imported 
    <div className={styles.chip} onClick={select_chip}>
        {props.text}

    </div>
    )
}
