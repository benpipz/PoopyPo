import React from "react";

interface RoundImageProps {
  src: string;
}
const RoundImage = ({ src }) => {
  return (
    <img
      src={src}
      alt=""
      className="rounded-full shadow-lg w-12 h-12 m-1 "
    ></img>
  );
};

export default RoundImage;
