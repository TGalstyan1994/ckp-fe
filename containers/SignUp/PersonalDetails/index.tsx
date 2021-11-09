import { Select } from 'components/Select'
import { TextArea } from 'components/Textarea'
import { FC, useState } from 'react'
import { useSelectorTyped } from 'utils/hooks'
import { form } from './style.module.css'

type StateSelect = {
  options: Array<string>
  currentOption: string
}

export const PersonalDetails: FC = () => {
  const [formState, setFormState] = useState('')
  const { options, currentOption } = useSelectorTyped(
    (state) => state.signup.stages[3]
  ) as StateSelect

  return (
    <div className={form}>
      <Select
        label="Objective"
        required
        options={options || []}
        currentOption={currentOption || ''}
        placeholder="Start a Business"
        setCurrentOption={setFormState}
      />
      <TextArea
        value=""
        onChange={() => console.log('some')}
        name="karl"
        label="Objective Note"
        required
      />
    </div>
  )
}
