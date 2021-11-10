import { Select } from 'components/Select'
import { TextArea } from 'components/Textarea'
import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'utils/hooks'
import {
  endStageFetching,
  setCurrentOption,
  startStageFetching,
  validateStage,
} from 'store/reducers/signup'
import { haveErrors } from 'utils'
import { LinkText } from 'components/LinkText'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import {
  form,
  form_actions,
  actions_buttons,
  form_fullName,
} from './style.module.css'

export const PersonalDetails: FC = () => {
  const { options, currentOption, errors } = useSelectorTyped(
    (state) => state.signup.stages[3]
  )

  const dispatch = useDispatch()

  const [personalDetailsState, setPersonalDetailsState] = useState({
    objectiveNote: '',
    firstName: '',
    lastName: '',
    PhoneCodeNumber: '',
    PhoneNumber: '',
    Address: '',
  })

  const setCurrentOptionCallback = (option: string) => {
    dispatch(setCurrentOption(option))
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    // const validationErrors = validate(personalDetailsState)
    // dispatch(validateStage({ errors: validationErrors }))

    // if (haveErrors(validationErrors)) {
    // dispatch(endStageFetching())
    // }
  }

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPersonalDetailsState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className={form}>
      <Select
        label="Objective"
        required
        options={options || []}
        currentOption={currentOption || ''}
        placeholder="Start a Business"
        setCurrentOption={setCurrentOptionCallback}
      />
      <TextArea
        value={personalDetailsState.objectiveNote}
        onChange={handleFormInputs}
        name="objectiveNote"
        label="Objective Note"
        required
      />
      <div className={form_fullName}>
        <Input
          name="firstName"
          onChange={handleFormInputs}
          value={personalDetailsState.firstName}
          label="Username"
          required
          placeholder="Enter Username"
          error={errors?.username}
        />
        <Input
          name="username"
          onChange={handleFormInputs}
          value={personalDetailsState.lastName}
          label="Username"
          required
          placeholder="Enter Username"
          error={errors?.username}
        />
      </div>

      <div className={form_actions}>
        <LinkText href="#">Accept Terms and Conditions *</LinkText>
        <div className={actions_buttons}>
          <Button secondary>Back</Button>
          <Button onClick={handleForm}>Continue</Button>
        </div>
      </div>
    </div>
  )
}
