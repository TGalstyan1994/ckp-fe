import Link from 'next/link'
import success_monochromatic from '../../assets/images/success_monochromatic.svg'
import { password_success_popup } from '../../containers/SignIn/NewPassword/NewPasswordForm.module.css'

const PasswordSuccessPopup = () => {
  return (
    <div className={password_success_popup}>
      <div>
        <img src={success_monochromatic} alt="success monochromatic" />
        <h1>Password was updated successfully</h1>
        <Link href="/signin">
          <a>
            <button>OK</button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PasswordSuccessPopup
