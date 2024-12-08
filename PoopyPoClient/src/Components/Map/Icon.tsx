import React from "react";
import YourIcon from "../../assets/poopypo.svg";

const Icon: React.FC = () => {
  const icon = React.useMemo(() => <YourIcon />, []); // Cache the SVG

  return (
    <svg width={30} height={30} viewBox="0 0 100 100">
      {icon}
    </svg>
  );
};

export default Icon;
