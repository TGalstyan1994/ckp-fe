import { ChangeEvent, FC } from 'react'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

export const Social: FC = () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  return (
    <div className="admin-info">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Social Presence</span>
        </div>
        <div className="w-100">
          <div className="input-container">
            <div className="input-flex">
              <Input
                label="About me"
                name="about"
                placeholder="Null"
                value=""
                onChange={changeValue}
              />
              <Input
                label="Facebook"
                name="facebook"
                placeholder="https://www.facebook.com"
                value=""
                onChange={changeValue}
              />
            </div>
          </div>
          <div className="mt-24" />
          <div className="input-container">
            <div className="input-flex">
              <Input
                label="Twitter"
                name="twitter"
                placeholder="https://www.twitter.com"
                value=""
                onChange={changeValue}
              />
              <Input
                label="LinkedIn"
                name="confirmSecurityPin"
                placeholder="https://www.linkedin.com"
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
    </div>
  )
}
