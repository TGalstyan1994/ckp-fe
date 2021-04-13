import React from 'react';
import { v4 } from 'uuid';
import { Container, CheckboxStyled, InputStyled } from './styled';


interface IComponentsProps {
  value: boolean;
  onChange: (val: boolean) => void;
  children: React.ReactNode;
}

export const Checkbox: React.FC<IComponentsProps> = ({
  value,
  onChange,
  children,
}: IComponentsProps) => {
  const checkboxId = v4();
  return (
    <Container>
      <InputStyled
        id={checkboxId}
        type="checkbox"
        checked={value}
        onChange={({ target }) => onChange(target.checked)}
      />
      <CheckboxStyled htmlFor={checkboxId} />
      {children}
    </Container>
  );
};
