import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsFormFilled } from '../../../../../store/ProfileDataStore/ProfileDataStore'
import { toggleAlertModal } from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { ProfileManager } from '../../../../../managers/profile'
import { Input } from '../../../../../components/Input'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'

export const Social: FC = () => {
  const dispatch = useDispatch()
  const { socialInfo } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const [inputValue, setInputValue] = useState({
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  })

  const [inputError, setInputError] = useState({
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
    setInputError({
      about: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
    })
    dispatch(setIsFormFilled(true))
  }

  const resetValue = () => {
    setInputValue({
      about: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
    })
    setInputError({
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
    } catch (error_: any) {
      const { errors } = error_.data
      const newInputErrors = {
        about: '',
        facebook: '',
        twitter: '',
        linkedIn: '',
      }

      if (typeof errors !== 'object' && errors.length === 0) return
      for (const error of errors) {
        newInputErrors[error.property] = error.messages[0]
      }
      setInputError({
        ...inputError,
        ...newInputErrors,
      })
      throw error_
    }
  }

  const isFormFilled = () => {
    return !Object.values(inputValue).every((val: string) => val === '')
  }

  useEffect(() => {
    setInputValue(socialInfo)
  }, [socialInfo])

  useEffect(() => {
    if (Object.values(inputValue).every((name: string) => name === '')) {
      dispatch(setIsFormFilled(false))
    } else {
      dispatch(setIsFormFilled(true))
    }
  }, [inputValue])

  return (
    <>
      <div className="content">
        <div className="input-container">
          <div className="input-label">About me</div>
          <Input
            name="about"
            value={inputValue.about}
            onChange={handleChange}
            placeholder="Add info here"
            error={inputError.about}
          />
          <div className="input-label">Facebook</div>
          <Input
            name="facebook"
            value={inputValue.facebook}
            onChange={handleChange}
            placeholder="https://www.facebook.com"
            error={inputError.facebook}
          />
          <div className="input-label">Twitter</div>
          <Input
            name="twitter"
            value={inputValue.twitter}
            onChange={handleChange}
            placeholder="https://www.twitter.com"
            error={inputError.twitter}
          />
          <div className="input-label">Linked in</div>
          <Input
            name="linkedIn"
            value={inputValue.linkedIn}
            onChange={handleChange}
            placeholder="https://www.linkedin.com"
            error={inputError.linkedIn}
          />
          <div className="btn-container">
            <button onClick={resetValue} className="btn-cancel">
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className={isFormFilled() ? 'btn-save' : 'btn-disable'}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
