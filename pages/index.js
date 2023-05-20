import Featured from '@/components/Featured'
import PizzaList from '@/components/PizzaList'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'
import AddButton from "../components/AddButton";
import Add from "../components/Add";
import Layout from '@/components/Layout'
import dbConnect from "../utils/mongo";
import ProductS from "../models/ProductS";

export default function Home({pizzaList , admin}) {
  const [close, setClose] = useState(true);

  return (
    <Layout title="Pizza Restaurant in NYC">
    
    <Featured/>
    {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {

  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const {method}=ctx.req


  dbConnect();
      const products = await ProductS.find();
    return {
         props: {
           pizzaList: products.map((product)=>({
            title:product.title,
            _id:JSON.parse(JSON.stringify(product._id)),
            img:product.img,
            desc:product.desc,
            prices:product.prices,
            extraOptions:JSON.parse(JSON.stringify(product.extraOptions)),
           })),
           admin
         }
       };


  //  const res = await axios.get("https://food-ordering-app-betaa.vercel.app/api/products");
  //
};

