import React from 'react';
import { v4 } from 'uuid';
import {
  ContainerForm,
  RadioStyled,
  InputStyled,
  RadioContainer,
  LabelStyled,
} from './styled';

interface IComponentProps {
  options: Array<string>;
  value: number;
  onChange: (val: number) => void;
}

export const Radio: React.FC<IComponentProps> = ({
  options,
  value,
  onChange,
}: IComponentProps) => {
  return (
    <ContainerForm>
      {options.map((elem, i) => {
        const id = v4();
        return (
          <RadioContainer key={v4()}>
            <InputStyled
              key={id}
              id={id}
              type="radio"
              checked={value === i}
              value={i}
              onChange={({ target }) => onChange(+target.value)}
            />
            <RadioStyled htmlFor={id} />
            <LabelStyled>{elem}</LabelStyled>
          </RadioContainer>
        );
      })}
    </ContainerForm>
  );
};
