import is from 'is_js'

export const enterSecurityQuestionValidation = (answer: string) => {
  let error
  if (is.empty(answer) || answer.length > 255)
    error = "Security Answer can't be more then 255 digits"
  return error
}
