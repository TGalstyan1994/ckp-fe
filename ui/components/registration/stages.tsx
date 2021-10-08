import { ReactElement, FC, useState } from 'react';

type Props = {
  children: Array<ReactElement>;
};

export const Stages: FC<Props> = ({ children: allStages }) => {
  const [currentStage, setStage] = useState(0);
  const changeStage = (onValue: number): void =>
    setStage((prev) => prev + onValue);

  return (
    <div>
      {allStages[currentStage]}
      <button onClick={() => changeStage(-1)} disabled={!currentStage}>
        {'<'}
      </button>
      <button
        onClick={() => changeStage(1)}
        disabled={currentStage === allStages.length}
      >
        {'>'}
      </button>
    </div>
  );
};
