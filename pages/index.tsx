import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import PostModal from "../components/PostModal";

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Comma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>

        {/* Nav Bar */}
        <Header />

        {/* Feed */}
        <Feed />

        <PostModal/>

      </div>
    </div>
  );
};

export default Home;
