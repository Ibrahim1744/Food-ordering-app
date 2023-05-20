import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from "next/head";

const Layout = ({children , title}) => {
  return (
    <>  <Head>
    <title>{title}</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <meta name="description" content="Best pizza shop in Newyork" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
      <Navbar/>
      
        {children}
      <Footer/>
    </>
  );
}

export default Layout;
