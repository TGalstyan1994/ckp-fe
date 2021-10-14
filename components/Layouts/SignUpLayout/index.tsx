import classNames from 'classnames'
import { Button } from 'components/Button'
import { Logo } from 'components/Logo'
import { FC, ReactChild } from 'react'
import {
  registration_page,
  stages_wrapper,
  stages_navbar,
  stages_navbar_wrapper,
  navbar_link,
  active_link,
  link_description,
  navbar_button,
} from './style.module.css'

type Props = {
  changeStageOn: (stage: number) => void
  currentStage: number
  children: ReactChild
}

const stages = [
  { count: 1, text: 'login \n password' },
  { count: 2, text: 'security \n pin' },
  { count: 3, text: 'security \n question' },
  { count: 4, text: 'presonal \n details' },
  { count: 5, text: 'payment \n details' },
  { count: 6, text: 'confirm' },
]

export const SignUpWrapper: FC<Props> = ({
  changeStageOn,
  currentStage,
  children,
}) => {
  return (
    <div className={registration_page}>
      <Logo />
      <div className={stages_wrapper}>{children}</div>
      <div className={stages_navbar_wrapper}>
        <div className={stages_navbar}>
          {stages.map((stage) => (
            <div
              className={classNames(navbar_link, {
                [active_link]: currentStage === stage.count,
              })}
            >
              <Button
                className={navbar_button}
                onClick={() => changeStageOn(stage.count)}
              >
                {stage.count}
              </Button>
              <span className={link_description}>{stage.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
