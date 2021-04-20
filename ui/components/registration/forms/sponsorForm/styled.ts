import { Input } from 'ui/components/common/input';
import styled from 'styled-components';
import { H1 } from 'ui/typography/index';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormStyled = styled.span`
  max-width: 972px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Form = styled.div`
  width: 872px;
  display: flex;
  flex-direction: column;
`;

export const H1Styled = styled(H1)`
  margin-bottom: 29px;
`;

export const InputStyled = styled(Input)`
  margin-bottom: 21px;
`;

export const ButtonsContainer = styled.div`
  width: 232px;
  margin-top: 21px;
  display: flex;
  justify-content: flex-end;
  grid-column-gap: 12px;
  align-self: flex-end;
`;
