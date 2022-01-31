import React, { FC } from 'react'
import { useSelectorTyped } from '../../../../utils/hooks'
import { RootState } from '../../../../store'
import PencilIcon from '../../../../assets/images/icons/pencil-icon'

interface ILine {
  name: string
  text: string
  isLink?: boolean
}
export const Account: FC = () => {
  const { memberAccountInfo } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )

  const Line = ({ text, name, isLink }: ILine) => {
    return (
      <div className="member-info">
        <span className="name">{name}:</span>
        {isLink ? (
          <span className="member-info__title" title={text}>
            <a className="link" target="_blank" href={text} rel="noreferrer">
              {text}
              <span className="pensil">
                <PencilIcon />
              </span>
            </a>
          </span>
        ) : (
          <span className="member-info__title" title={text}>
            {text}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="admin-info">
      <div className="flex-container">
        <div className="info_1">
          <span className="basic">Basic Info</span>
          <div className="admin-account-info">
            <Line text={memberAccountInfo.id} name="Member ID" />
            <Line text={memberAccountInfo.username} name="Username" />
            <Line text="company" name="Parent" isLink />
            <Line text={memberAccountInfo.kycStatus} name="KYC Status" />
            <Line text="*************" name="Security Question" />
            <Line text="*************" name="Security Question Response" />
          </div>
        </div>
        <div className="info_1">
          <span className="basic">Placement Info</span>
          <div className="admin-account-info">
            <Line text="0" name="Global Level" />
            <Line text="0" name="Sponsor Based Level" />
            <Line text="0" name="Position" />
          </div>
        </div>
      </div>
    </div>
  )
}
