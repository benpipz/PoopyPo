import React from "react";

const Hamburger = ({ onClick, size = "4.5vh" }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 96 960 960"
      style={{
        height: size,
        width: size,
        cursor: "pointer",
        fill: "black",
      }}
    >
      <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
    </svg>
  );
};

export default Hamburger;
