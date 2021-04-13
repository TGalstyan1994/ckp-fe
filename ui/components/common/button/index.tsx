import React, { ButtonHTMLAttributes } from 'react';
import { ButtonStyled } from './styled';

interface IComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<IComponentProps> = ({
  primary,
  children,
  ...props
}: IComponentProps) => {
  return (
    <ButtonStyled primary={primary} {...props}>
      {children}
    </ButtonStyled>
  );
};
