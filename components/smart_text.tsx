import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";


type ButtonProps = { onClick: () => void; value: string };
import styles from "../styles/recipeview.module.css";

const SmartText: React.FC<ButtonProps> = ({ value, onClick }) => {
  const [conversionmodalIsOpen, setConversionModalIsOpen] = useState(false);
  const [conversionmodalXPosition, setConversionModalXPosition] = useState(0);
  const [conversionmodalYPosition, setConversionModalYPosition] = useState(0);
  const [conversionmodalAmount, setConversionModalAmount] = useState(0);
  const [conversionmodalUnit, setConversionModalUnit] = useState("cups");
  const onScroll = (e) => {
    setConversionModalIsOpen(false);
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
  },[]);
  return (
    
    <text onClick={onClick}>
                      <Modal
                      className={styles.shareModal}
                      isOpen={conversionmodalIsOpen}
                      onRequestClose={() => setConversionModalIsOpen(false)}
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
                          top: conversionmodalYPosition,
                          right: "0px",
                          left: conversionmodalXPosition,
                          bottom: "0px",
                          border: "none",
                          background: "#F1F3F4",
                          width: "fit-content",
                          "box-shadow": "4px 5px 20px rgba(0, 0, 0, 0.25)",
                          overflow: "none",
                          WebkitOverflowScrolling: "touch",
                          outline: "none",
                          padding: "12px",
                          height: "136px",
                          "z-index": "150",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {conversionmodalUnit == "Cups" || conversionmodalUnit == "Cup" ? (
                      <div className={styles.conversionModalContent}>
                        <p>{conversionmodalAmount} {conversionmodalUnit} <text className={styles.lessImportant}> is equal to</text></p>
                        <p>{conversionmodalAmount * 8} Ounces</p>
                        <p>{conversionmodalAmount * 16} Tablespoons</p>
                        <p>{conversionmodalAmount * 236.588} Milliliters</p>
                      </div>) : null }
                      {conversionmodalUnit == "Tablespoons" || conversionmodalUnit == "Tablespoon" ? (
                      <div className={styles.conversionModalContent}>
                        <p>{conversionmodalAmount} {conversionmodalUnit} <text className={styles.lessImportant}> is equal to</text></p>
                        <p>{conversionmodalAmount * 0.5} Ounces</p>
                        <p>{conversionmodalAmount * 0.0625} Cups</p>
                        <p>{conversionmodalAmount * 14.7868} Milliliters</p>
                      </div>) : null }
                      {conversionmodalUnit == "Ounces" || conversionmodalUnit == "Ounce" ? (
                      <div className={styles.conversionModalContent}>
                        <p>{conversionmodalAmount} {conversionmodalUnit} <text className={styles.lessImportant}> is equal to</text></p>
                        <p>{conversionmodalAmount / 8} Cups</p>
                        <p>{conversionmodalAmount * 2} Tablespoons</p>
                        <p>{conversionmodalAmount * 29.5735} Milliliters</p>
                      </div>) : null }
                      {conversionmodalUnit == "Milliliters" || conversionmodalUnit == "Milileter" ? (
                      <div className={styles.conversionModalContent}>
                        <p>{conversionmodalAmount} {conversionmodalUnit} <text className={styles.lessImportant}> is equal to</text></p>
                        <p>{conversionmodalAmount / 29.574} Ounces</p>
                        <p>{conversionmodalAmount / 14.787} Tablespoons</p>
                        <p>{conversionmodalAmount / 237} Cups</p>
                      </div>) : null }
                    </Modal>
      {value.split(" ").map((item, index) => {
                if(item == "ounces" || item == "ounce") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                }
                if (Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                  if (value.split(" ")[index + 1] == "ounces" || value.split(" ")[index + 1] == "ounce") {
                    const unit = value.split(" ")[index + 1]
                    const amount = value.split(" ")[index]
                    return (
                      
                      <text className={styles.clickablecontainer}
                      onClick={(context) => {
                        console.log(context.pageX)
                        console.log(context.pageY)
                        if(unit == "ounce" || unit == "ounces") {
                          if(amount.includes("/")) {
                            const fraction = amount.split("/")
                            const first = Number(fraction[0])
                            const second = Number(fraction[1])
                            const cups = Number(first / second).toFixed(2)
                            const ounces = Number(cups) * 8
                            const tablespoons = Number(ounces) * 2
                            const milliliters = Number(cups) * 250
                            console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                            setConversionModalAmount(Number(cups))
                            if (unit == "ounces") {
                              setConversionModalUnit("Ounces")
                            }
                            if (unit == "ounce") {
                              setConversionModalUnit("Ounce")
                            }
        
                            setConversionModalXPosition(context.clientX - 8)
                            setConversionModalYPosition(context.clientY - 154)
                            console.log(context.clientX)
        
                            setConversionModalIsOpen(true)
                            console.log(conversionmodalIsOpen)
                            
                
                            console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                          } else {
                            const cups = Number(amount)
                            const ounces = Number(cups) * 8
                            const tablespoons = Number(ounces) * 2
                            const milliliters = Number(cups) * 250
                            console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                            setConversionModalAmount(Number(cups))
                            if (unit == "ounces") {
                              setConversionModalUnit("Ounces")
                            }
                            if (unit == "ounce") {
                              setConversionModalUnit("Ounce")
                            }
        
                            setConversionModalXPosition(context.clientX - 8)
                            setConversionModalYPosition(context.clientY - 154)
                            console.log(context.clientX)
        
                            setConversionModalIsOpen(true)
                            console.log(conversionmodalIsOpen)
                            
                          }
                        }
        
        
        
                      }
        
                      }
                      
                      >
                      <text className={styles.clickable}>
                        {item}
                      </text> 
                      <text> </text>
                      
                      <text className={styles.clickable}> 
                        {value.split(" ")[index + 1]}
                      </text>
                      <text> </text>
                      </text>
                    );
                  } 
                } else if(item == "milliliters" || item == "milliliter") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                } else if(item == "milliliters" || item == "milliliter") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                } else if(item == "milliliters" || item == "milliliter") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                }
                if(item == "milliliters" || item == "milliliter") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                }
                if (Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                  if (value.split(" ")[index + 1] == "milliliters" || value.split(" ")[index + 1] == "milliliter") {
                    const unit = value.split(" ")[index + 1]
                    const amount = value.split(" ")[index]
                    return (
                      
                      <text className={styles.clickablecontainer}
                      onClick={(context) => {
                        console.log(context.pageX)
                        console.log(context.pageY)
                        if(unit == "milliliter" || unit == "milliliters") {
                          if(amount.includes("/")) {
                            const fraction = amount.split("/")
                            const first = Number(fraction[0])
                            const second = Number(fraction[1])
                            const cups = Number(first / second).toFixed(2)
                            const ounces = Number(cups) * 8
                            const tablespoons = Number(ounces) * 2
                            const milliliters = Number(cups) * 250
                            console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                            setConversionModalAmount(Number(cups))
                            if (unit == "milliliters") {
                              setConversionModalUnit("Milliliters")
                            }
                            if (unit == "milliliter") {
                              setConversionModalUnit("Milliliters")
                            }
        
                            setConversionModalXPosition(context.clientX - 8)
                            setConversionModalYPosition(context.clientY - 154)
                            console.log(context.clientX)
        
                            setConversionModalIsOpen(true)
                            console.log(conversionmodalIsOpen)
                            
                
                            console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                          } else {
                            const cups = Number(amount)
                            const ounces = Number(cups) * 8
                            const tablespoons = Number(ounces) * 2
                            const milliliters = Number(cups) * 250
                            console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                            setConversionModalAmount(Number(cups))
                            if (unit == "milliliters") {
                              setConversionModalUnit("Milliliters")
                            }
                            if (unit == "milliliter") {
                              setConversionModalUnit("Milliliter")
                            }
        
                            setConversionModalXPosition(context.clientX - 8)
                            setConversionModalYPosition(context.clientY - 154)
                            console.log(context.clientX)
        
                            setConversionModalIsOpen(true)
                            console.log(conversionmodalIsOpen)
                            
                          }
                        }
        
        
        
                      }
        
                      }
                      
                      >
                      <text className={styles.clickable}>
                        {item}
                      </text> 
                      <text> </text>
                      
                      <text className={styles.clickable}> 
                        {value.split(" ")[index + 1]}
                      </text>
                      <text> </text>
                      </text>
                    );
                  } 
                } else if(item == "tablespoons" || item == "tablesoon") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                } else if(item == "ounces" || item == "ounce") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                } else if(item == "milliliters" || item == "milliliter") {
                  if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
                    return (
                      <text></text>
                    )
                  } 
                }
        if(item == "cups" || item == "cup") {
          if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
            return (
              <text></text>
            )
          } 
        }
        if (Number.parseFloat(value.split(" ")[index - 1]) != 0) {
          if (value.split(" ")[index + 1] == "cups" || value.split(" ")[index + 1] == "cup") {
            const unit = value.split(" ")[index + 1]
            const amount = value.split(" ")[index]
            return (
              
              <text className={styles.clickablecontainer}
              onClick={(context) => {
                console.log(context.pageX)
                console.log(context.pageY)
                if(unit == "cup" || unit == "cups") {
                  if(amount.includes("/")) {
                    const fraction = amount.split("/")
                    const first = Number(fraction[0])
                    const second = Number(fraction[1])
                    const cups = Number(first / second).toFixed(2)
                    const ounces = Number(cups) * 8
                    const tablespoons = Number(ounces) * 2
                    const milliliters = Number(cups) * 250
                    console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                    setConversionModalAmount(Number(cups))
                    if (unit == "cups") {
                      setConversionModalUnit("Cups")
                    }
                    if (unit == "cup") {
                      setConversionModalUnit("Cup")
                    }

                    setConversionModalXPosition(context.clientX - 8)
                    setConversionModalYPosition(context.clientY - 154)
                    console.log(context.clientX)

                    setConversionModalIsOpen(true)
                    console.log(conversionmodalIsOpen)
                    
        
                    console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                  } else {
                    const cups = Number(amount)
                    const ounces = Number(cups) * 8
                    const tablespoons = Number(ounces) * 2
                    const milliliters = Number(cups) * 250
                    console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                    setConversionModalAmount(Number(cups))
                    if (unit == "cups") {
                      setConversionModalUnit("Cups")
                    }
                    if (unit == "cup") {
                      setConversionModalUnit("Cup")
                    }

                    setConversionModalXPosition(context.clientX - 8)
                    setConversionModalYPosition(context.clientY - 154)
                    console.log(context.clientX)

                    setConversionModalIsOpen(true)
                    console.log(conversionmodalIsOpen)
                    
                  }
                }



              }

              }
              
              >
              <text className={styles.clickable}>
                {item}
              </text> 
              <text> </text>
              
              <text className={styles.clickable}> 
                {value.split(" ")[index + 1]}
              </text>
              <text> </text>
              </text>
            );
          } 
        } else if(item == "tablespoons" || item == "tablesoon") {
          if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
            return (
              <text></text>
            )
          } 
        } else if(item == "ounces" || item == "ounce") {
          if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
            return (
              <text></text>
            )
          } 
        } else if(item == "milliliters" || item == "milliliter") {
          if(Number.parseFloat(value.split(" ")[index - 1]) != 0) {
            return (
              <text></text>
            )
          } 
        }
        if (Number.parseFloat(value.split(" ")[index - 1]) != 0) {
          if (value.split(" ")[index + 1] == "tablespoons" || value.split(" ")[index + 1] == "tablespoon") {
            const unit = value.split(" ")[index + 1]
            const amount = value.split(" ")[index]
            return (
              
              <text className={styles.clickablecontainer}
              onClick={(context) => {
                console.log(context.pageX)
                console.log(context.pageY)
                if(unit == "tablespoon" || unit == "tablespoons") {
                  if(amount.includes("/")) {
                    const fraction = amount.split("/")
                    const first = Number(fraction[0])
                    const second = Number(fraction[1])
                    const cups = Number(first / second).toFixed(2)
                    const ounces = Number(cups) * 8
                    const tablespoons = Number(ounces) * 2
                    const milliliters = Number(cups) * 250
                    console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                    setConversionModalAmount(Number(cups))
                    if (unit == "tablespoons") {
                      setConversionModalUnit("Tablespoons")
                    }
                    if (unit == "tablespoon") {
                      setConversionModalUnit("Tablespoon")
                    }

                    setConversionModalXPosition(context.clientX - 8)
                    setConversionModalYPosition(context.clientY - 154)
                    console.log(context.clientX)

                    setConversionModalIsOpen(true)
                    console.log(conversionmodalIsOpen)
                    
        
                    console.log(cups + " " + unit + " is equal to " + ounces + " ounces, " + tablespoons + " tablespoons, and " + milliliters + " Milliliters")
                  } else {
                    const tablespoons = Number(amount)
                    setConversionModalAmount(Number(tablespoons))
                    if (unit == "tablespoons") {
                      setConversionModalUnit("Tablespoons")
                    }
                    if (unit == "tablespoon") {
                      setConversionModalUnit("Tablespoon")
                    }

                    setConversionModalXPosition(context.clientX - 8)
                    setConversionModalYPosition(context.clientY - 154)
                    console.log(context.clientX)

                    setConversionModalIsOpen(true)
                    console.log(conversionmodalIsOpen)
                    
                  }
                }



              }
              
              }
              
              >
              <text className={styles.clickable}>
                {item}
              </text> 
              <text> </text>
              
              <text className={styles.clickable}> 
                {value.split(" ")[index + 1]}
              </text>
              <text> </text>
              </text>
            );
          } else {
            return item + " ";
          }
        } else {
          return item + " ";
        }

      })}
      
    </text>
  );
};

export default SmartText;
