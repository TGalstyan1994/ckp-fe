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
  children: Array<ReactChild>
}

const stages = [
  { count: 1, text: 'login password' },
  { count: 2, text: 'security pin' },
  { count: 3, text: 'security question' },
  { count: 4, text: 'presonal details' },
  { count: 5, text: 'payment details' },
  { count: 6, text: 'confirm' },
]

export const SignUpStages: FC<Props> = ({
  changeStageOn,
  currentStage,
  children: allStages,
}) => {
  return (
    <div className={registration_page}>
      <Logo />
      <div className={stages_wrapper}>{allStages[currentStage]}</div>
      <div className={stages_navbar_wrapper}>
        <div className={stages_navbar}>
          {stages.map((stage) => (
            <div
              key={stage.count}
              className={classNames(navbar_link, {
                [active_link]: currentStage + 1 === stage.count,
              })}
            >
              <Button
                className={navbar_button}
                onClick={() => changeStageOn(stage.count - 1)}
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
