import React, { useState } from 'react';
import styles from '../styles/Feature.module.css'
import Image from 'next/image';
const Featured = () => {
  const images=[
    "/images/featured.png ",
    "/images/featured2.png",
    "/images/featured3.png",

  ]
  const [index,setIndex]=useState(0)
  const handleClick=(direction)=>{
    if(direction ==='l'){
      setIndex(index !== 0 ? index-1 : 2)
    }
    if(direction ==='r'){
      setIndex(index !== 2 ? index+1 : 0)
    }
  }
  console.log(index);
  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{left:0}} onClick={()=>handleClick('l')}>
      <Image src='/images/arrowl.png' alt='arrow-l'layout='fill'  />

      </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {
            
                images.map((img,index)=>(
                  <div key={index} className={styles.imgContainer}>
                              <Image  src={img} layout='fill' alt='slider-img' objectFit='contain'  />

            </div>

                ))
              }
          
          
        </div>
        <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleClick('r')}>
      <Image src='/images/arrowr.png' alt='arrow-r'layout='fill'  />

      </div>
    </div>
  );
}

export default Featured;
  