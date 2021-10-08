import styled from 'styled-components';
import { PALETTE } from 'utils/constants/ui';

interface IButtonStyled {
  primary?: boolean;
}

export const ButtonStyled = styled.button`
  width: 100%;
  height: 56px;
  background-color: ${(props: IButtonStyled) =>
    props.primary ? PALETTE.greenBackground : '#EBEBEB'};
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: 0.2s;
  color: ${(props: IButtonStyled) => (props.primary ? '#FFFFFF' : '#000')};

  &:hover {
    transition: 0.2s;
    box-shadow: 0px 0px 8px #9db7bd;
  }

  &:active {
    background-color: ${(props: IButtonStyled) =>
      props.primary ? 'rgba(1,184,87, 0.8)' : 'rgba(250,250,250,0.8)'};
  }

  &:disabled {
    opacity: 0.2;
    box-shadow: none;
    cursor: default;
  }
`;
