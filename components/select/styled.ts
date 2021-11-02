import styled from 'styled-components'
import { PALETTE } from 'utils/constants/ui'

interface ILabel {
  required: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const SelectStyled = styled.select`
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  border-radius: 5px;
  border: none;
  outline: none;
  background: #ffffff;
  opacity: 0.8;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  padding: 20px 23px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: #000000;

  &:not(:focus) {
    color: ${PALETTE.secondaryText};
  }
`

export const InputConteiner = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: ${PALETTE.secondaryText};
  margin-bottom: 19px;

  &:after {
    ${(props: ILabel) => (props.required ? `content: '*';` : '')}
    color: ${PALETTE.error};
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
  }
`

export const ErrorMessage = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: ${PALETTE.error};
  margin-top: 14px;
`
