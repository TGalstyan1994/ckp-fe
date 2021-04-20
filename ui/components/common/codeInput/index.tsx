import React, { InputHTMLAttributes } from 'react';
import {
  Container,
  InputConteiner,
  Label,
  InputStyled,
  ErrorIcon,
  ErrorMessage,
} from './styled';
import errorIcon from './img/errorIcon.svg';

interface IComponentProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder: string;
  label?: string;
  validate?: (val: string) => boolean;
  required?: boolean;
}

export const CodeInput: React.FC<IComponentProps> = (
  props: IComponentProps
) => {
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
  } = props;
  const handleChange = (val: string): void => {
    if (validate && validate(val)) {
      onChange(val);
    } else if (!validate) {
      onChange(val);
    }
  };

  return (
    <Container>
      {label && <Label required={!!required}>{label}</Label>}
      <InputConteiner>
        <InputStyled
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={({ target }) => handleChange(target.value)}
          {...restProps}
        />
        {error && <ErrorIcon src={errorIcon} />}
        {disabled && <ErrorIcon src={errorIcon} />}
      </InputConteiner>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
