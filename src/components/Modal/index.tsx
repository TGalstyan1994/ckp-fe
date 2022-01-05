import { FC } from 'react'
import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'
import { FromSecurity } from './ModalPages/from-security'
import { FromSocial } from './ModalPages/from-social'
import { FromPin } from './ModalPages/from-pin'
import { FromDefault } from './ModalPages/from-default'

export const Modal: FC = () => {
  const { modalFrom } = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )
  const renderModalFrom = () => {
    switch (modalFrom) {
      case 'security':
        return <FromSecurity />
      case 'social':
        return <FromSocial />
      case 'pin':
        return <FromPin />
      case 'default':
        return <FromDefault />
      default:
        return <FromDefault />
    }
  }
  return <div className="modal-container">{renderModalFrom()}</div>
}
