import React from "react";

import "./globals.css";
import Main from "./view/landingPage/page";
import ImageGenMain from "./view/imagegeneration/page";
import Home from "./view/home/[username]/page";
import FeaturesCard from "./view/home/components/features-card";

// Define Page as a React functional component
const Page: React.FC = () => {
  return (
    <>
      {/* <Main /> */}
      <Home />
      {/* <ImageGenMain /> */}
      {/* <FeaturesCard /> */}
    </>
  );
};

export default Page;
