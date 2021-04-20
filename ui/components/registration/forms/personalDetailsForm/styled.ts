import styled from 'styled-components';
import { Radio } from 'ui/components/common/radio';
import { Select } from 'ui/components/common/select';
import { Textarea } from 'ui/components/common/textarea';
import { Input } from 'ui/components/common/input';
import { H1 } from 'ui/typography';

export const H1Styled = styled(H1)`
  margin-bottom: 31px;
`;

export const SelectStyled = styled(Select)`
  margin-bottom: 25px;
`;

export const TextareaStyled = styled(Textarea)`
  height: 166px;
  margin-bottom: 22px;
`;

export const InputsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 22px;
  margin-bottom: 22px;
`;

export const BirthContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  margin-bottom: 22px;
  align-items: end;
  margin-bottom: 22px;
`;

export const QuestionsContaainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 311px 1fr;
  grid-column-gap: 20px;
  grid-template-rows: 75px;
  grid-row-gap: 40px;
`;

export const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const RadioStyled = styled(Radio)`
  margin-bottom: 40px;
`;

export const EmployedContainer = styled.div`
  width: 100%;
  height: 273px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InputDescription = styled(Input)`
  margin-top: 35px;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 56px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
`;
