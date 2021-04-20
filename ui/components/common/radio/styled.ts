import { PALETTE } from 'utils/constants/ui';
import styled from 'styled-components';

interface ILabel {
  required: boolean;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContainerForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RadioStyled = styled.label`
  width: 20px;
  height: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  border: 5px solid #fff;
  box-sizing: border-box;
  margin-right: 15px;
`;

export const InputStyled = styled.input`
  display: none;

  &:checked ~ ${RadioStyled} {
    background-color: ${PALETTE.greenBackground};
  }
`;

export const RadioContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const OptionText = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.4);
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: ${PALETTE.secondaryText};
  margin-bottom: 37px;

  &:after {
    ${(props: ILabel) => (props.required ? `content: '*';` : '')}
    color: ${PALETTE.error};
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
  }
`;
