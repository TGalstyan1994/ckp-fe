import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArrowNextIcon from '../../../assets/images/icons/arrow-next-icon'
import { closeQuestionModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import CloseIcon from '../../../assets/images/icons/close-icon'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'

export const EnterSecurityQuestion: FC = () => {
  const { promiseInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const resolve = () => {
    promiseInfo.resolve(inputValue)
  }
  const onSave = async () => {
    if (inputValue === '') return

    resolve()
    dispatch(closeQuestionModal())
  }
  return (
    <div className="modal-container">
      <div className="security-question__modal">
        <span
          className="closeModal"
          onClick={() => dispatch(closeQuestionModal())}
          aria-hidden
        >
          <CloseIcon />
        </span>
        <div className="pin-holder">
          <p>Security Question</p>
          <span className="span">Enter the name of your first pet*</span>
          <div className="input-holder">
            <input
              className="pin-input"
              value={inputValue}
              onChange={handleChange}
              placeholder="admin"
            />
            <button className="pin-btn" onClick={onSave}>
              Continue{' '}
              <span>
                <ArrowNextIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
