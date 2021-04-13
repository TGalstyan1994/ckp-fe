import styled from 'styled-components';
import checkIcon from './img/check.svg';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxStyled = styled.label`
  padding: 7px;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
`;

export const InputStyled = styled.input`
  display: none;

  &:checked ~ ${CheckboxStyled} {
    content: url(${checkIcon});
  }
`;
