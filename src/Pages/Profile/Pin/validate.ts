import is from 'is_js'

type FormState = {
  oldSecurityCode: string
  securityCode: string
  securityCodeRepeat: string
}
type ErrorsObject = FormState

const digitRegExp = '[0-9]'

export const validate = ({
  oldSecurityCode,
  securityCode,
  securityCodeRepeat,
}: FormState): ErrorsObject => {
  const errors = {
    oldSecurityCode: '',
    securityCode: '',
    securityCodeRepeat: '',
  }

  if (is.empty(securityCode) || securityCode.search(digitRegExp) === -1) {
    errors.securityCode = 'Pin is not valid. It must include 6 digit'
  }

  if (securityCode.length < 6) {
    errors.securityCode = 'The value must  be 6 characters long'
  }

  if (is.empty(oldSecurityCode) || oldSecurityCode.search(digitRegExp) === -1) {
    errors.oldSecurityCode = 'Pin is not valid. It must include 6 digit'
  }

  if (oldSecurityCode.length < 6) {
    errors.oldSecurityCode = 'The value must  be 6 characters long'
  }
  if (
    is.empty(securityCodeRepeat) ||
    securityCodeRepeat.search(digitRegExp) === -1
  ) {
    errors.securityCodeRepeat = 'Pin is not valid. It must include 6 digit'
  }
  if (securityCodeRepeat !== securityCode || errors.securityCode) {
    errors.securityCodeRepeat = 'Confirm Pin Mismatch'
  }

  return errors
}
