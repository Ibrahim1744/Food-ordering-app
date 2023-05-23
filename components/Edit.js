import { useEffect, useRef, useState } from "react";
import styles from "../styles/Edit.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const Edit = ({ setOpen , product }) => {

  const titleRef=useRef()
  const descRef=useRef()
  const smPricesRef=useRef()
  const mdPricesRef=useRef()
  const lgPricesRef=useRef()
  const extraOptionText=useRef()
  const extraOptionPrice=useRef()
  useEffect(() => {
      titleRef.current.value=product.title
      descRef.current.value=product.desc
      smPricesRef.current.value=product.prices[0]
      mdPricesRef.current.value=product.prices[1]
      lgPricesRef.current.value=product.prices[2]
      extraOptionText.current.value=product.extraOptions[0].text
      extraOptionPrice.current.value=product.extraOptions[0].price
  }, []);

  const [file, setFile] = useState(product.img);
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [prices, setPrices] = useState(product.prices);
  const [extraOptions, setExtraOptions] = useState(product.extraOptions);
  const [extra, setExtra] = useState(product.extraOptions[0]);
const [wait,setWait]=useState(false)
const [done,setDone]=useState(false)
console.log(extra);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    if(e.target.name==='price'){
      const priceValue=e.target.value
      

      // setExtra({...extra,   });  مكنش ليه لزمه لان الاكسترا كدا كدا فيها الاوبجكت
      setExtraOptions(extra , extra.price=parseInt(priceValue));
    }
    else{
      const textValue=e.target.value

      // setExtra({...extra, text:e.target.value  });  مكنش ليه لزمه برضو
      setExtraOptions(extra , extra.text=textValue);

    }
  
    
  };

  // const handleExtra = (e) => {
  //  
  // };

  const handleUpdate = async () => {
    setExtraOptions(extra);
    console.log(extraOptions ,'a');
    setWait(true)
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploadsss");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dial2z54w/image/upload",
        data
      );
          console.log(uploadRes.data);
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };
      await axios.put(`/api/products/${product._id}`, newProduct);
      setOpen(false);
      
        setWait(false)
        setDone(true)
    
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setOpen(false)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Edit a new Product</h1>
        {/* <h4 style={{color:"red"}}>You Should Fill all inputs.</h4> */}
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input  type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Image src={product.img} width={35} height={35} alt={product.title}/>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input

            className={styles.input}
            type="text"
            placeholder={product.title}
          ref={titleRef}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            ref={descRef}
            placeholder={product.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              ref={smPricesRef}
              onChange={(e) => changePrice(e, 0)}
              placeholder={product.prices[0]}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={product.prices[1]}
              
                ref={mdPricesRef}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={product.prices[2]}
              ref={lgPricesRef}

              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              name="text"
              ref={extraOptionText}
              onChange={handleExtraInput}
            />
            <input 
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              ref={extraOptionPrice}
              name="price"
              onChange={(e)=>handleExtraInput(e)}
            />
          {/* <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button> */}
          </div>
        
        </div>
        <button type="submit" className={styles.addButton} onClick={handleUpdate}>
          Update
        </button>
        {
          wait ? (        <span className={styles.wait}>Please Wait...</span>
          ) :(<span>
            
          </span>)
        }
        {
          done&& (<span className={styles.done}>Done</span>) 
        }

      </div>
    </div>
  );
};

export default Edit; 