import { ChangeEvent, FC } from 'react'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

export const Security: FC = () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  return (
    <div className="admin-info">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Change Password</span>
        </div>
        <div className="input-container">
          <div className="input-flex">
            <Input
              label="Password"
              name="curentPassword"
              placeholder="**************"
              value=""
              onChange={changeValue}
              className="mb-24"
            />
            <Input
              label="Confirm Password"
              name="newPassword"
              placeholder="**************"
              value=""
              onChange={changeValue}
              className="mb-24"
            />
          </div>
          <div className="w-140">
            <Button>Save</Button>
          </div>
        </div>
      </div>
      <div className="mt-37" />
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Change Security PIN</span>
        </div>
        <div className="input-container">
          <div className="input-flex">
            <Input
              label="Security PIN"
              name="securityPin"
              placeholder="**************"
              value=""
              onChange={changeValue}
            />
            <Input
              label="Confirm Security PIN"
              name="confirmSecurityPin"
              placeholder="**************"
              value=""
              onChange={changeValue}
            />
          </div>
          <div className="mt-24" />
          <div className="w-140">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
