import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Layout from "@/components/Layout";
import dbConnect from "../../utils/mongo";
import ProductS from "../../models/ProductS";
import OrderS from "../../models/OrderS";


const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title="Admin Dashboard">

    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th className={styles.thId}>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td   className={styles.tdCenterImg}>
                  <Image
                
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td className={`${styles.tdCenter} ${styles.thId}`} >{product._id.slice(0, 2)}...</td>
                <td className={styles.tdCenter}>{product.title}</td>
                <td className={styles.tdCenter}>${product.prices[0]}</td>
                <td className={styles.tdCenter}>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.thId}>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td className={`${styles.tdCenter} ${styles.thId}`}>{order._id.slice(0, 2)}...</td>
                <td className={styles.tdCenter}>{order.customer}</td>
                <td className={styles.tdCenter}>${order.total}</td>
                <td className={styles.tdCenter}>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td className={styles.tdCenter}>
                
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
    </Layout>

  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  dbConnect();
      const products = await ProductS.find();
      const orders = await OrderS.find();
    return {
         props: {
           products: products.map((product)=>({
            title:product.title,
            _id:JSON.parse(JSON.stringify(product._id)),
            img:product.img,
            desc:product.desc,
            prices:product.prices,
            extraOptions:JSON.parse(JSON.stringify(product.extraOptions)),
           })),
           orders: orders.map((order)=>({
            customer:order.customer,
            _id:JSON.parse(JSON.stringify(order._id)),
            total:order.total,
            method:order.method,
           })),
           
         }
       };


  // const productRes = await axios.get("https://food-ordering-app-betaa.vercel.app/api/products");
  // const orderRes = await axios.get("https://food-ordering-app-betaa.vercel.app/api/orders");

  // return {
  //   props: {
  //     orders: orderRes.data,
  //     products: productRes.data,
  //   },
  // };
};

export default Index;