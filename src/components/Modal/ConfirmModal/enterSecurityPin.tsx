import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import ArrowNextIcon from '../../../assets/images/icons/arrow-next-icon'
import { closePinModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { PinInput } from '../../PinInput'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'
import CloseIcon from '../../../assets/images/icons/close-icon'

export const EnterSecurityPin: FC = () => {
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
    dispatch(closePinModal())
  }
  return (
    <div className="modal-container">
      <div className="pin">
        <span
          className="closeModal"
          onClick={() => dispatch(closePinModal())}
          aria-hidden
        >
          <CloseIcon />
        </span>
        <div className="pin-holder">
          <p>Enter Security Pin</p>
          <div className="input-holder">
            <PinInput value={inputValue} onChange={handleChange} />
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
