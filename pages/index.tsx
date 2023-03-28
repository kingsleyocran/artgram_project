import type { NextPage } from "next";
import CustomHead from "../components/CustomHead";
import NavBar from "../components/NavBar";
import HomeFeedSection from "../components/HomeFeedSection";
import ProtectedRoute from "../context/ProtectedRoute";
import { useState } from "react";

const Home: NextPage = () => {
  const [sideIsOpen, setsideIsOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="bg-[#0E0E0E]">
        <CustomHead title="Artgram" />

        <div className="flex flex-row relative">
          <div className="relative grow">
            <NavBar />

            <HomeFeedSection />
          </div>

          <aside
            onClick={() => setsideIsOpen(false)}
            className={`flex-none ${ sideIsOpen ? " basis-1/4" : "basis-0"} transition-all duration-400 ease-out h-screen sticky top-0 border-neutral-800 border-l-2  bg-[#141414]`}
          ></aside>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
