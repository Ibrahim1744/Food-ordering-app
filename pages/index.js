import Featured from '@/components/Featured'
import PizzaList from '@/components/PizzaList'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'
import AddButton from "../components/AddButton";
import Add from "../components/Add";
import Layout from '@/components/Layout'


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

   const res = await axios.get("https://Food-ordering-app-BETA/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin
    }
  };
};

