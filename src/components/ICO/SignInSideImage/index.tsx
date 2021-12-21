import { FC } from 'react'
import Image from 'next/image'
import side_signin from '../../../UI/bg.svg'

export const SideImage: FC<{ className: string }> = ({ className }) => (
  <Image className={className} src={side_signin} alt="Sider" />
)
