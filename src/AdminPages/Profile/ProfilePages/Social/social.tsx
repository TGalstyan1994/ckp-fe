import { ChangeEvent, FC } from 'react'
import { Input } from '../../../../components/Input'

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
                label="About"
                name="curentPassword"
                placeholder="**************"
                value=""
                onChange={changeValue}
              />
              <Input
                label="Facebook"
                name="newPassword"
                placeholder="**************"
                value=""
                onChange={changeValue}
              />
            </div>
          </div>
          <div className="mt-22" />
          <div className="input-container">
            <div className="input-flex">
              <Input
                label="Twitter"
                name="securityPin"
                placeholder="**************"
                value=""
                onChange={changeValue}
              />
              <Input
                label="LinkedIn"
                name="confirmSecurityPin"
                placeholder="**************"
                value=""
                onChange={changeValue}
              />
            </div>
            <button className="btn-save">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
