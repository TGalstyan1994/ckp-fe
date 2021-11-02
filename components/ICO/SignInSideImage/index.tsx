import Image from 'next/image'
import { FC } from 'react'
import side_signin from '../../../UI/svg/bg.svg'

export const SideImage: FC<{ className: string }> = ({ className }) => (
  <Image layout="fill" className={className} src={side_signin} alt="Sider" />
)
