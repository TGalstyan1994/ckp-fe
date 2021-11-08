import { createGlobalStyle } from 'styled-components'
import SFProBoldTtf from './typography/fonts/SFProDisplay-Bold.ttf'
import SFProMediumTtf from './typography/fonts/SFProDisplay-Medium.ttf'
import SFProBRegularTtf from './typography/fonts/SFProDisplay-Regular.ttf'
import SFProBoldWoff from './typography/fonts/SFProDisplay-Bold.woff'
import SFProMediumWoff from './typography/fonts/SFProDisplay-Medium.woff'
import SFProBRegularWoff from './typography/fonts/SFProDisplay-Regular.woff'
import SFProBoldWoff2 from './typography/fonts/SFProDisplay-Bold.woff2'
import SFProMediumWoff2 from './typography/fonts/SFProDisplay-Medium.woff2'
import SFProBRegularWoff2 from './typography/fonts/SFProDisplay-Regular.woff2'

export default createGlobalStyle`
  body {
    margin: 0 !important;
    padding: 0 !important;
    background: #fff;
  }

  * {
    font-family: 'SF Pro Display';
  }

  @font-face {
  font-family: 'SF Pro Display';
    src: url(${SFProMediumTtf}) format('truetype'),
      url(${SFProMediumWoff}) format('woff'),
      url(${SFProMediumWoff2}) format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SF Pro Display';
    src: url(${SFProBoldTtf}) format('truetype'),
      url(${SFProBoldWoff}) format('woff'),
      url(${SFProBoldWoff2}) format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'SF Pro Display';
    src: url(${SFProBRegularTtf}) format('truetype'),
      url(${SFProBRegularWoff}) format('woff'),
      url(${SFProBRegularWoff2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`
