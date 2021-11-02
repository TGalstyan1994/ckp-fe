import React from 'react'

export const Stages: React.FC = () => {
  // const [currentStage, setStage] = useState(0);

  // const handleChangeStage = (delt: number): void => {
  //   if (currentStage + delt >= React.Children.count(children)) {
  //     setStage(React.Children.count(children) - 1);
  //   } else if (currentStage + delt < 0) {
  //     setStage(0);
  //   } else {
  //     setStage(currentStage + delt);
  //   }
  // };

  // const inner = React.cloneElement(
  //   React.Children.toArray(children)[currentStage],
  //   {
  //     handleNextStage: () =>
  //       setStage(Math.min(React.Children.count(children), currentStage + 1)),
  //     handlePrevStage: () => setStage(Math.max(currentStage - 1, 0)),
  //   }
  // );

  return (
    <>
      {/* <FormContainer>{inner}</FormContainer>
      <button onClick={() => handleChangeStage(-1)}>{'<'}</button>
      <button onClick={() => handleChangeStage(1)}>{'>'}</button> */}
    </>
  )
}
