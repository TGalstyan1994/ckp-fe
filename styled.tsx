import styled from 'styled-components';
import { PALETTE } from 'utils/constants/ui';

type StyledProps = {
  primary?: boolean;
};





export const LoginPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const WelcomeSideImage = styled.img`
  height: 100%;
  width: auto;
`;

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 134px;
  height: auto;
  position: absolute;
  top: 18px;
  left: 35px;
`;


