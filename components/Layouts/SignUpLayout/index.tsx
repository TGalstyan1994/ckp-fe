import classNames from 'classnames'
import { Button } from 'components/Button'
import { SuccessICO } from 'components/ICO/SuccessICO'
import { Logo } from 'components/Logo'
import { cloneElement, FC, ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { changeStage } from 'store/reducers/signup'
import { useSelectorTyped } from 'utils/hooks'
import {
  registration_page,
  stages_wrapper,
  stages_navbar,
  stages_navbar_wrapper,
  navbar_link,
  active_link,
  finished_stage_link,
  link_description,
  navbar_button,
} from './style.module.css'

type Props = {
  children: Array<ReactElement>
}

export const SignUpStages: FC<Props> = ({ children: allStages }) => {
  const { currentStage, stages } = useSelectorTyped((state) => state.signup)
  const dispatch = useDispatch()

  const currentStageWithProps = allStages[currentStage]
    ? cloneElement(allStages[currentStage])
    : undefined

  return (
    <div className={registration_page}>
      <Logo />
      <div className={stages_wrapper}>
        {currentStageWithProps ?? <span>Not Found :(</span>}
      </div>
      <div className={stages_navbar_wrapper}>
        <div className={stages_navbar}>
          {stages.map((stage) => (
            <div
              key={stage.title}
              className={classNames(navbar_link, {
                [active_link]: currentStage === stage.number - 1,
              })}
            >
              <Button
                className={classNames(navbar_button, {
                  [finished_stage_link]: stage.finished,
                })}
                onClick={() => dispatch(changeStage(stage.number - 1))}
              >
                {stage.finished ? <SuccessICO /> : stage.number}
              </Button>
              <span className={link_description}>{stage.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
