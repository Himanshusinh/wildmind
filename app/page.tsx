import React from "react";
import Main from "./view/landingPage/Main";
import "./globals.css";
import SignIn from "./view/signin/Signin";
import Signup from "./view/signup/Signup";
import Home from "./view/home/Home";
import Scrollbar from "./Scrollbar";
import ContactSection from "./view/contactus/ContactSection";
import ImageGenMain from "./view/ImageGeneate/ImageGenMain";
import SupportPage from "./view/landingPage/Supportus";

const page = () => {
  return (
    <>
      {/* <Main /> */}
      {/* <SignIn /> */}
      {/* <Signup /> */}
      {/* <Home /> */}
      {/* <Scrollbar /> */}
      <ContactSection />
      {/* <ImageGenMain /> */}
      {/* <SupportPage /> */}
    </>
  );
};

export default page;
