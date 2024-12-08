import React from "react";

const Hamburger = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      height="26"
      viewBox="0 96 960 960"
      width="26"
    >
      <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
    </svg>
  );
};

export default Hamburger;
