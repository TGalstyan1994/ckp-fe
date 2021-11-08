import is from 'is_js'

export const validate = (answer: string): { answer: string } => {
  const errors = { answer: '' }
  if (is.empty(answer))
    errors.answer = 'Security Question response cannot be empty'
  return errors
}
