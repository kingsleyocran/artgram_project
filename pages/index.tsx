import type { NextPage } from "next";
import CustomHead from "../components/CustomHead";
import NavBar from "../components/NavBar";
import HomeFeedSection from "../components/HomeFeedSection";
import ProfileAside from "../components/ProfileAside";
import PostModal from "../components/PostModal";
import ProtectedRoute from "../context/ProtectedRoute";
import React, { useState, useEffect } from "react";

import * as userRedux from "../redux/features/users";
import * as utilBools from "../redux/features/utilBools/utilBoolsSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
  const isSideBarOpen = useAppSelector(utilBools.selectIsSideBarOpen);


  return (
    <ProtectedRoute>
      <div className="bg-[#0E0E0E]">
        <CustomHead title="Artgram" />

        <div className="flex flex-row relative">
          <div
            className={`relative grow  ${
              isSideBarOpen ? " w-[0px] overflow-hidden" : "w-full"
            } `}
          >
            <NavBar />

            <HomeFeedSection />
          </div>

          <ProfileAside />

          <PostModal/>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
