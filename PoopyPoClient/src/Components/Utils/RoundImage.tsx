import React from "react";

interface RoundImageProps {
  src: string;
}

const RoundImage: React.FC<RoundImageProps> = ({ src }) => {
  return (
    <img
      src={src}
      alt="user"
      style={{
        height: "4.5vh",         // slightly smaller than navbar
        aspectRatio: "1 / 1",    // make it perfectly square
        borderRadius: "50%",     // round shape
        objectFit: "cover",      // fills the box without stretching
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        margin: "0 0.5rem",
      }}
    />
  );
};

export default RoundImage;
