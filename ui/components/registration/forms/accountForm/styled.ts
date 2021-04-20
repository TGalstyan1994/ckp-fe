import styled from 'styled-components';
import { H1 } from 'ui/typography';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormStyled = styled.div`
  width: 972px;
  display: flex;
  flex-direction: column;
`;

export const H1Styled = styled(H1)`
  margin-bottom: 36px;
`;

export const InputsContainer = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 476px 476px;
  grid-column-gap: 20px;
  grid-row-gap: 25px;
  margin-bottom: 28px;
`;

export const ButtonsContainer = styled.div`
  width: 476px;
  margin-top: 21px;
  display: grid;
  grid-template-columns: 232px 232px;
  grid-column-gap: 12px;
  align-self: flex-end;
`;
