import React, { InputHTMLAttributes } from 'react'
import {
  Container,
  InputConteiner,
  Label,
  SelectStyled,
  ErrorMessage,
} from './styled'

interface IComponentProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value: string
  onChange: (val: string) => void
  error?: string
  placeholder: string
  label?: string
  validate?: (val: string) => boolean
  required?: boolean
  options: Array<string>
}

export const Select: React.FC<IComponentProps> = (props: IComponentProps) => {
  const {
    value,
    onChange,
    error,
    placeholder,
    label,
    validate,
    required,
    options,
    ...restProps
  } = props
  const handleChange = (val: string): void => {
    if (validate && validate(val)) {
      onChange(val)
    } else if (!validate) {
      onChange(val)
    }
  }

  return (
    <Container>
      {label && <Label required={!!required}>{label}</Label>}
      <InputConteiner>
        <SelectStyled
          placeholder={placeholder}
          value={value}
          onChange={({ target }) => handleChange(target.value)}
          {...restProps}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectStyled>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputConteiner>
    </Container>
  )
}
