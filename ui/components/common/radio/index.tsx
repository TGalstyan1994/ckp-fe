import React from 'react';
import { v4 } from 'uuid';
import {
  ContainerForm,
  RadioStyled,
  InputStyled,
  RadioContainer,
  OptionText,
  Label,
  Container,
} from './styled';

interface IComponentProps {
  options: Array<string>;
  value: string;
  label: string;
  required?: boolean;
  onChange: (val: string) => void;
  className?: string;
}

export const Radio: React.FC<IComponentProps> = ({
  options,
  value,
  onChange,
  label,
  required,
  className,
}: IComponentProps) => {
  return (
    <Container className={className}>
      <Label required={!!required}>{label}</Label>
      <ContainerForm>
        {options.map((elem, i) => {
          const id = v4();
          return (
            <RadioContainer key={v4()}>
              <InputStyled
                key={id}
                id={id}
                type="radio"
                checked={value === options[i]}
                value={i}
                onChange={({ target }) => onChange(options[+target.value])}
              />
              <RadioStyled htmlFor={id} />
              <OptionText>{elem}</OptionText>
            </RadioContainer>
          );
        })}
      </ContainerForm>
    </Container>
  );
};
