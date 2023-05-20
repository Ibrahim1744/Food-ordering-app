import React from "react";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";
const PizzaList = ({ pizzaList }) => {
  console.log(pizzaList);
  return (
    <>
      {pizzaList.length !==0 ? (
        <div id="products" className={styles.container}>
          <h1 className={styles.title}>THE BEST RESTAURANT IN TOWN</h1>
          <p className={styles.desc}>
          Nothing brings people together like good food.

          </p>
          <div className={styles.wrapper}>
            {pizzaList ? (
              pizzaList.map((pizza) => (
                <PizzaCard key={pizza._id} pizza={pizza} />
              ))
            ) : (
              <div>there is no pizza</div>
            )}
          </div>
        </div>
      ) : <span className={styles.noProducts}>There are no products in stock , please add some</span>}
    
    </>
  );
};

export default PizzaList;
