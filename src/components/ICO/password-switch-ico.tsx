import { FC } from 'react'

type Props = {
  visible?: boolean
  onClick?: () => void
}

export const PasswordSwitchICO: FC<Props> = ({ visible, onClick }) =>
  visible ? (
    <svg
      onClick={onClick}
      viewBox="0 0 17 15"
      fill="none"
      width={15}
      height={12}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.53881 3.23051C10.7123 3.23051 12.4201 4.93827 12.4201 7.11179C12.4201 7.57754 12.3425 8.12092 12.1096 8.50905L14.3607 10.7602C15.5251 9.75106 16.4566 8.50905 17 7.11176C15.6803 3.69623 12.3425 1.28984 8.46119 1.28984C7.37443 1.28984 6.3653 1.52272 5.35616 1.83322L7.06393 3.54098C7.52968 3.30814 8.07306 3.23051 8.53881 3.23051ZM0.776256 1.13462L2.56164 2.92001L2.87215 3.23051C1.55251 4.23964 0.543379 5.55928 0 7.11179C1.31963 10.5273 4.65753 12.9337 8.53881 12.9337C9.7032 12.9337 10.8676 12.7008 11.9543 12.3127L12.2648 12.6232L14.516 14.8743L15.5251 13.8652L1.78539 0.125488L0.776256 1.13462ZM5.04566 5.40403L6.21005 6.56841C6.21005 6.80129 6.21005 6.95654 6.21005 7.11179C6.21005 8.43142 7.21918 9.44056 8.53881 9.44056C8.69406 9.44056 8.84931 9.44055 9.08219 9.36293L10.2466 10.5273C9.7032 10.8378 9.15985 10.9931 8.53881 10.9931C6.3653 10.9931 4.65753 9.2853 4.65753 7.11179C4.65753 6.49078 4.81279 5.9474 5.04566 5.40403ZM8.38356 4.78302L10.79 7.18941C10.79 7.11179 10.79 7.11179 10.79 7.03416C10.79 5.71453 9.78082 4.7054 8.46119 4.7054C8.46119 4.78302 8.46119 4.78302 8.38356 4.78302Z" />
    </svg>
  ) : (
    <svg
      onClick={onClick}
      // height="15"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={9}
    >
      <path d="M7.5 0.0293045C4.63409 0.0293045 2.03513 1.59727 0.117367 4.14406C-0.0391224 4.35271 -0.0391224 4.64421 0.117367 4.85286C2.03513 7.40272 4.63409 8.97069 7.5 8.97069C10.3659 8.97069 12.9649 7.40272 14.8826 4.85593C15.0391 4.64728 15.0391 4.35578 14.8826 4.14713C12.9649 1.59727 10.3659 0.0293045 7.5 0.0293045ZM7.70558 7.6482C5.80316 7.76786 4.23213 6.1999 4.35179 4.29441C4.44998 2.72338 5.72338 1.44998 7.29442 1.35179C9.19684 1.23213 10.7679 2.80009 10.6482 4.70558C10.5469 6.27354 9.27355 7.54694 7.70558 7.6482ZM7.61046 6.19376C6.58561 6.2582 5.73872 5.41439 5.80623 4.38953C5.85839 3.54265 6.54572 2.85839 7.39261 2.80316C8.41746 2.73872 9.26435 3.58254 9.19684 4.60739C9.14161 5.45734 8.45428 6.1416 7.61046 6.19376Z" />
    </svg>
  )
