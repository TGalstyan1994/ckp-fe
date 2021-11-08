import { FC, useState } from 'react'
import { Select } from 'components/Select'
import { Input } from 'components/Input'

const TestPage: FC = () => {
  const [val, setVal] = useState<string>('')
  const [options] = useState(['Name', 'Cum', 'Surname'])
  const [currentOption, setCurrentOption] = useState('')
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Select
        options={options}
        currentOption={currentOption}
        setCurrentOption={setCurrentOption}
      />

      <Input onChange={() => console.log('govno')} />
      {/* <Textarea
        label="textarea"
        value={val}
        onChange={setVal}
        placeholder="textarea"
        error="error"
        disabled
      />

      <Button disabled primary>
        button click
      </Button>
      <Button disabled>Create an account</Button>

      <H1 primary>Sign In.</H1>
      <H1>Sign In.</H1>
      <br />
      <LinkText>Forgot your password ?</LinkText> */}
    </div>
  )
}

export default TestPage
