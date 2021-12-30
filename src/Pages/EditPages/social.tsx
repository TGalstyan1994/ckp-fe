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
          <label>About me</label>
          <input
            name="info"
            value={inputValue.info}
            onChange={handleChange}
            placeholder="Add info here"
          />
          <label htmlFor="">Facebook</label>
          <input
            name="facebook"
            value={inputValue.facebook}
            onChange={handleChange}
            placeholder="https://www.facebook.com"
          />
          <label>Twitter</label>
          <input
            name="twitter"
            value={inputValue.twitter}
            onChange={handleChange}
            placeholder="https://www.twitter.com"
          />
          <label>Linked in</label>
          <input
            name="linked"
            value={inputValue.linked}
            onChange={handleChange}
            placeholder="https://www.linkedin.com"
          />
          <label>Google plus</label>
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
