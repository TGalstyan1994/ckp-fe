import { PALETTE } from 'utils/constants/ui';
import styled from 'styled-components';

interface IComponentProps {
  primary?: boolean;
}

export const H1 = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  color: ${(props: IComponentProps) =>
    props.primary ? PALETTE.greenText : '#000'};
`;

export const LinkText = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-decoration-line: underline;
  color: ${(props: IComponentProps) =>
    props.primary ? PALETTE.greenText : '#000'};
  cursor: pointer;
`;
