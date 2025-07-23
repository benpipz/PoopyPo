import React from "react";
import type { PoopSpot } from "./Poopspot"; // Make sure file is named exactly "Poopspot.ts" or adjust the name

type Props = {
  spot: PoopSpot;
};

const PoopPopup: React.FC<Props> = ({ spot }) => {
  const handleCleanedClick = () => {
    alert(`Marked poop spot #${spot.id} as cleaned.`);
  };

  const handleReportAgainClick = () => {
    alert(`Reporting poop spot #${spot.id} again.`);
  };

  return (
    <div>
      <p>
        <strong>Description:</strong> {spot.description}
      </p>
      <p>
        <strong>Reported by:</strong> {spot.reporter}
      </p>
      {spot.photoUrl && (
        <img
          src={spot.photoUrl}
          alt="Poop"
          style={{ width: "100%", maxHeight: 150 }}
        />
      )}
      <div style={{ marginTop: "8px" }}>
        <button onClick={handleCleanedClick} style={{ marginRight: "8px" }}>
          Mark as Cleaned
        </button>
        <button onClick={handleReportAgainClick}>Report Again</button>
      </div>
    </div>
  );
};

export default PoopPopup;
