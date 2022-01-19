import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsFormFilled } from '../../../../../store/ProfileDataStore/ProfileDataStore'
import { toggleAlertModal } from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { ProfileManager } from '../../../../../managers/profile'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'

export const Social: FC = () => {
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState({
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  })

  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
    dispatch(setIsFormFilled(true))
  }
  useEffect(() => {
    if (Object.values(inputValue).every((name: string) => name === '')) {
      dispatch(setIsFormFilled(false))
    } else {
      dispatch(setIsFormFilled(true))
    }
  }, [inputValue])
  const resetValue = () => {
    setInputValue({
      about: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
    })
    dispatch(setIsFormFilled(false))
  }

  const onSubmit = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return
    try {
      await ProfileManager.changeSocialInfo(inputValue)
      dispatch(toggleAlertModal(true))
      resetValue()
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <div className="content">
        <div className="input-container">
          <div className="input-label">About me</div>
          <input
            name="about"
            value={inputValue.about}
            onChange={handleChange}
            placeholder="Add info here"
          />
          {/* <span className="error-span">{errorMessage}</span> */}
          <div className="input-label">Facebook</div>
          <input
            name="facebook"
            value={inputValue.facebook}
            onChange={handleChange}
            placeholder="https://www.facebook.com"
          />
          {/* <span className="error-span">{errorMessage}</span> */}
          <div className="input-label">Twitter</div>
          <input
            name="twitter"
            value={inputValue.twitter}
            onChange={handleChange}
            placeholder="https://www.twitter.com"
          />
          {/* <span className="error-span">{errorMessage}</span> */}
          <div className="input-label">Linked in</div>
          <input
            name="linkedIn"
            value={inputValue.linkedIn}
            onChange={handleChange}
            placeholder="https://www.linkedin.com"
          />
          {/* <span className="error-span">{errorMessage}</span> */}

          <div className="btn-container">
            <button onClick={resetValue} className="btn-cancel">
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className={isFormFilled ? 'btn-save' : 'btn-disable'}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
