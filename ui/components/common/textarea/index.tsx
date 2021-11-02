import React, { InputHTMLAttributes } from 'react'
import {
  Container,
  InputConteiner,
  Label,
  TextareaStyled,
  ErrorMessage,
} from './styled'

interface IComponentProps
  extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string
  onChange: (val: string) => void
  error?: string
  placeholder: string
  label?: string
  validate?: (val: string) => boolean
  required?: boolean
}

export const Textarea: React.FC<IComponentProps> = (props: IComponentProps) => {
  const {
    value,
    onChange,
    error,
    placeholder,
    label,
    validate,
    required,
    disabled,
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
        <TextareaStyled
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={({ target }) => handleChange(target.value)}
          {...restProps}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputConteiner>
    </Container>
  )
}
