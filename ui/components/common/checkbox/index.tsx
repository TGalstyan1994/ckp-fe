import React from 'react'
import { Container, CheckboxStyled, InputStyled } from './styled'

interface IComponentsProps {
  value: boolean
  onChange: (val: boolean) => void
  children: React.ReactNode
}

export const Checkbox: React.FC<IComponentsProps> = ({
  value,
  onChange,
  children,
}: IComponentsProps) => {
  return (
    <Container>
      <InputStyled
        type="checkbox"
        checked={value}
        onChange={({ target }) => onChange(target.checked)}
      />
      <CheckboxStyled />
      {children}
    </Container>
  )
}
