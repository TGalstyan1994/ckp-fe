import { FC } from 'react'
import { useSelectorTyped } from '../../utils/hooks'
import { RootState } from '../../store'
import { FromSecurity } from './ModalPages/fromSecurity'
import { FromSocial } from './ModalPages/fromSocial'
import { FromPin } from './ModalPages/fromPin'
import { FromDefault } from './ModalPages/fromDefault'

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
        break
    }
  }
  return <div className="modal-container">{renderModalFrom()}</div>
}
