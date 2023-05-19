import React from 'react';
import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image';
import Link from 'next/link';
const PizzaCard = ({pizza}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`}>
      <Image className={styles.cardImg} src={pizza.img} width='350' height={350} alt='' />

      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>{pizza.prices[0]}</span>
      <p className={styles.desc}>
        {pizza.desc}
      </p>
      
    </div>
  );
}

export default PizzaCard;
