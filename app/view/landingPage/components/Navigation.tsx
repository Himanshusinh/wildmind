"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[1000] flex items-center justify-between p-2 rounded-[50px] 
      border-[1px] border-white/20 w-[45vw] text-white
      ${
        scrolled
          ? "backdrop-blur-xl bg-black/30 shadow-lg"
          : "backdrop-blur-xl bg-black/10 shadow-lg"
      } transition-all duration-300`}>
      {/* Logo */}
      <div>
        <span className="">
          <img
            src="./Core/Logomain.png"
            className="w-10 flex justify-center items-center"
            alt=""
          />
        </span>
      </div>

      {/* Features Dropdown */}
      <div className="relative">
        <span
          onClick={() => toggleDropdown("features")}
          className="cursor-pointer px-3 py-1 flex items-center gap-1  hover:bg-gradient-to-l  hover:bg-clip-text font-poppins text-sl bg-transparent hover:text-[#dbdbdb]"
        >
          Features
          <img
      width="12"
      height="12"
      src={
        activeDropdown === "features"
          ? "./Core/arrowup.svg"
          : "./Core/arrowdown.svg"
      }
      alt="arrow-icon"
      className="ml-1"
    />
        </span>

        {activeDropdown === "features" && (
          <ul className="absolute left-1/2 -translate-x-1/2 mt-4 w-80 bg-black text-white rounded-lg border border-[#5f5e5e] shadow-[6px_6px_10px_rgba(0,0,0,0.6)] p-3 flex flex-col items-center overflow-hidden whitespace-nowrap">
            <li className="w-full px-3 py-2 cursor-pointer text-sm text-center hover:text-[#dbdbdb]   hover:bg-gradient-to-l  hover:bg-clip-text" onClick={() => route.push("/view/home") }>
              Text to image
            </li>
            <li className="w-full px-3 py-2 cursor-pointer text-sm text-center hover:text-[#dbdbdb]   hover:bg-gradient-to-l  hover:bg-clip-text">
              Text to video (coming soon)
            </li>
            <li className="w-full px-3 py-2 cursor-pointer text-sm text-center hover:text-[#dbdbdb]   hover:bg-gradient-to-l  hover:bg-clip-text">
              Sketch to image (coming soon)
            </li>
            <li className="w-full px-3 py-2 cursor-pointer text-sm text-center hover:text-[#dbdbdb]   hover:bg-gradient-to-l  hover:bg-clip-text">
              Real-time generation (coming soon)
            </li>
          </ul>
        )}
      </div>

      <div className="relative">
  <span
    onClick={() => toggleDropdown("templates")}
    className="cursor-pointer hover:text-[#dbdbdb] bg-transparent px-3 py-1 flex items-center gap-1 text-sm hover:bg-gradient-to-l hover:bg-clip-text"
  >
    Templates
    <img
      width="12"
      height="12"
      src={
        activeDropdown === "templates"
          ? "./Core/arrowup.svg"
          : "./Core/arrowdown.svg"
      }
      alt="arrow-icon"
      className="ml-1"
    />
  </span>
  {activeDropdown === "templates" && (
    <ul className="absolute left-1/2 -translate-x-1/2 mt-4 w-80 bg-black text-white  rounded-lg border border-[#5f5e5e] shadow-[6px_6px_10px_rgba(0,0,0,0.6)] p-3 flex flex-col items-center overflow-hidden whitespace-nowrap">
      <li className="w-full px-3 py-2 cursor-pointer text-sm text-center hover:text-[#dbdbdb] hover:bg-gradient-to-l hover:bg-clip-text">
        Image generation
      </li>
      <li className="w-full px-3 py-2 cursor-pointer text-sm text-center hover:text-[#dbdbdb] hover:bg-gradient-to-l hover:bg-clip-text">
        video generation (Comming soon)
      </li>
    </ul>
  )}
</div>


      {/* Other Links */}
      <div>
        <span className="px-3 py-1 text-sm  hover:bg-gradient-to-l  hover:bg-clip-text cursor-pointer hover:text-[#dbdbdb]" onClick={() => route.push("/view/pricing")}>
          Pricing
        </span>
      </div>
      <div>
        <span className="px-3 py-1 text-sm  hover:bg-gradient-to-l  hover:bg-clip-text cursor-pointer hover:text-[#dbdbdb]">
          Art Station
        </span>
      </div>

      {/* Get Started Button */}
      <div>
        <button
          className="relative bg-black/20 border border-white/20 rounded-full px-5 py-2 text-base font-medium border-t-[#acacac] border-b-[#6A0DAD] hover:border-t-[#6A0DAD] hover:border-b-[#acacac] 
                    text-transparent bg-clip-text bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] shadow-[inset_0px_0px_8px_rgba(255,255,255,0.2)] 
                    transition-all duration-500 ease-in-out hover:text-white 
                    
                    before:absolute before:inset-0 before:rounded-full before:border-[1.5px] before:border-white/20 before:transition-all before:duration-500 
                     "
          onClick={() => route.push("/view/home")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Navigation;
