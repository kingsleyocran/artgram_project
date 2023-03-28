import React from "react";
import Head from "next/head";
import favicon from "../public/favicon/favicon-32x32.png";

function CustomHead({ title }) {
  return (
    <Head>
      <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Official website for... something." />
      <meta name="apple-mobile-web-app-title" content="Artgram" />
      <meta name="application-name" content="Artgram" />

      {/* 
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
      */}

      <title>{title}</title>
    </Head>
  );
}

export default CustomHead;
