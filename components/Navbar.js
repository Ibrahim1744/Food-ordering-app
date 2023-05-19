import React from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/images/telephone.png" alt="" width={32} height={32}  />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>022 88 5124 11</div>

        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref>
          <li className={styles.listItem}>Homepage</li>

          </Link>
          <Link href='#products' scroll={false}>
          <li className={styles.listItem}>Products</li>

          </Link>
          <Image src="/images/logo.png" alt="logo" width={160} height={69} />
          <Link href='/admin'>
          <li className={styles.listItem}>Admin Dashboard</li>

          </Link>
          <Link href='#contact' scroll={false}>
          <li className={styles.listItem}>Contact</li>

          </Link>


        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/images/cart.png" alt="" width={30} height={30} />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
