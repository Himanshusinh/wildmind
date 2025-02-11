import React from "react";

const Button = () => {
  return (
    <div className="flex justify-center mt-10 ">
      <button className="group bg-blue-600 text-white flex w-56 h-10 justify-center items-center gap-3 rounded-full relative overflow-hidden">
        
        {/* Image - Moves to center on hover */}
        <img
          src="./Landingpage/Header/Group.png"
          alt=""
          className="w-6 absolute left-6 transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2"
        />

        {/* Text - Disappears on hover */}
        <span className="text-[16px] transition-opacity duration-500 ease-in-out group-hover:opacity-0 ml-8">
          Start creating now!
        </span>

      </button>
    </div>
  );
};

export default Button;
