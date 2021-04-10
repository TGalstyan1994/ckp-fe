import { PALETTE } from './../../../utils/constants/ui';
import { PALETTE } from 'utils/constants/ui';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  height: 56px;
  border-radius: 5px;
  background: #FFFFFF;
  opacity: 0.8;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  padding: 20px 23px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
  transition-duration: 0.2s;

  &:not(:focus) {
    color: ${PALETTE.secondaryText};
  }
`;
