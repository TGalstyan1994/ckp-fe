import { GetServerSideProps } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'
import LockIcon from 'src/assets/images/icons/lock-icon'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import { Input } from '../../src/components/Input'
import { Button } from '../../src/components/Button'
import itemImage from '../../src/assets/images/itemImage.svg'
import { MemberManagement } from '../../src/managers/memberManagement'
import { useSelectorTyped } from '../../src/utils/hooks'
import { RootState } from '../../src/store'
import {
  setPaginationCount,
  setMembers,
} from '../../src/store/MebmerManagementDataStore/MemberManagementDataStore'

interface IMember {
  avatar: string
  blocked: boolean
  email: string
  firstName: string | null
  id: number
  kycStatus: string
  lastName: string | null
  phone: string | null
  status: string
  username: string
}

const MemberManagementPage = () => {
  const dispatch = useDispatch()

  const { count, members } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )

  const [searchValue, setSearchValue] = useState('')

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    ;(async () => {
      const body = {
        offset: 0,
        limit: 12,
      }
      try {
        const res = await MemberManagement.membersList(body)
        dispatch(setPaginationCount(res.count))
        dispatch(setMembers(res.members))
      } catch (error) {
        throw error
      }
    })()
  }, [])

  return (
    <div className="container">
      <div className="relative member-management">
        <div>
          <h1 className="container-title">Member Management</h1>
          <span className="title-info">
            Home / Admin Tools / Member Management
          </span>
        </div>
        <div className="mm-search-area">
          <p>found 12 results</p>
          <Input
            onChange={handleSearchInput}
            value={searchValue}
            placeholder="Member search"
          />
          <Button>search</Button>
        </div>
      </div>
      <div className="members-container">
        {members?.map((item: IMember) => {
          return (
            <div
              className={classNames('item', { blocked_item: !item.blocked })}
              key={item.id}
            >
              <LockIcon />
              <div className="top">
                <div className="image">
                  <img
                    src={item.avatar ? item.avatar : itemImage}
                    alt="itemImage"
                  />
                </div>
                <div className="name">
                  <h4>{item.firstName ? item.firstName : 'firstName'}</h4>
                  <h4>{item.lastName ? item.lastName : 'lastName'}</h4>
                  <p>{item.username}</p>
                </div>
              </div>
              <div className="bottom">
                <p> E-mail: {item.email} </p>
                <p> Phone: {item.phone} 87979</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MemberManagementPage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

MemberManagementPage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
