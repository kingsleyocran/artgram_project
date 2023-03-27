import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";

const Profile: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Comma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative">
        {/* Nav Bar */}
        <Header />

        {/* Feed */}
        

      </div>
    </div>
  );
};

export default Profile;
