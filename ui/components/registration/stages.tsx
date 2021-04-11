import React, { useState } from "react";

export const Stages: React.FC = ({ children }) => {
  const [currentStage, setStage] = useState(0);

  const handleChangeStage = (delt: number): void => {
    if (currentStage + delt >= React.Children.count(children)) {
      setStage(React.Children.count(children) - 1);
    } else if (currentStage + delt < 0) {
      setStage(0);
    } else {
      setStage(currentStage + delt);
    }
  };

  return (
    <div>
      {React.Children.toArray(children)[currentStage]}
      <button onClick={() => handleChangeStage(-1)}>{"<"}</button>
      <button onClick={() => handleChangeStage(1)}>{">"}</button>
    </div>
  );
};
