import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  setIsFormFilled,
  toggleModalFrom,
  toggleModalOpen,
} from '../../store/ProfileDataStore/ProfileDataStore'

export const Social: FC = () => {
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState({
    info: '',
    facebook: '',
    twitter: '',
    linked: '',
    google: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    if (Object.values(inputValue).every((name: string) => name === '')) {
      dispatch(setIsFormFilled(false))
    } else {
      dispatch(setIsFormFilled(true))
    }
  }, [inputValue])

  const openModal = () => {
    dispatch(toggleModalOpen(true))
    dispatch(toggleModalFrom('social'))
  }
  const resetValue = () => {
    setInputValue({
      info: '',
      facebook: '',
      twitter: '',
      linked: '',
      google: '',
    })
  }

  return (
    <>
      <div className="content">
        <div className="input-container">
          <div className="input-label">About me</div>
          <input
            name="info"
            value={inputValue.info}
            onChange={handleChange}
            placeholder="Add info here"
          />
          <div className="input-label">Facebook</div>
          <input
            name="facebook"
            value={inputValue.facebook}
            onChange={handleChange}
            placeholder="https://www.facebook.com"
          />
          <div className="input-label">Twitter</div>
          <input
            name="twitter"
            value={inputValue.twitter}
            onChange={handleChange}
            placeholder="https://www.twitter.com"
          />
          <div className="input-label">Linked in</div>
          <input
            name="linked"
            value={inputValue.linked}
            onChange={handleChange}
            placeholder="https://www.linkedin.com"
          />
          <div className="input-label">Google plus</div>
          <input
            name="google"
            value={inputValue.google}
            onChange={handleChange}
            placeholder="https://www.google.com"
          />
          <div className="btn-container">
            <button onClick={resetValue} className="btn-cancel">
              Cancel
            </button>
            <button onClick={openModal} className="btn-save">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
