import { useEffect, useRef, useState } from "react";
import styles from "../styles/Edit.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Edit = ({ setOpen , product }) => {


  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [prices, setPrices] = useState(product.prices);
  console.log(prices);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
const [wait,setWait]=useState(false)
const [done,setDone]=useState(false)

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
    console.log(extraOptions);
  };

  const handleUpdate = async () => {
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
        console.log(newProduct);
      
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
        <h4 style={{color:"red"}}>You Should Fill all inputs.</h4>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input  type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            placeholder={product.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
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
              onChange={(e) => changePrice(e, 0)}
              placeholder={product.prices[0]}

            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={product.prices[1]}
              

              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={product.prices[2]}
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
              placeholder={product.extraOptions[0].text}
              onChange={handleExtraInput}
            />
            <input required
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={product.extraOptions[0].price}
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
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