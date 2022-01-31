import { GetServerSideProps } from 'next'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LockIcon from 'src/assets/images/icons/lock-icon'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import ReactPaginate from 'react-paginate'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import { Input } from '../../src/components/Input'
import { Button } from '../../src/components/Button'
import { MemberManagement } from '../../src/managers/memberManagement'
import { useSelectorTyped } from '../../src/utils/hooks'
import { RootState } from '../../src/store'
import {
  setPaginationCount,
  setMembers,
} from '../../src/store/MebmerManagementDataStore/MemberManagementDataStore'
import { setShowLoader } from '../../src/store/GlobalConfigDataStore/GlobalConfigDataStore'
import PaginationIcon from '../../src/assets/images/icons/arrow-duble-icon'

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

interface IMembersListReqBody {
  offset: number
  limit: number
  query?: string
}

const MemberManagementPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { members, count } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const [page, setPage] = useState<number>(0)

  const [searchValue, setSearchValue] = useState('')

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected)
  }

  const handleMemberClick = (selectedMember: number | string) => {
    router.push(`/member_management/${selectedMember}`)
  }

  const getMembersList = async () => {
    const body: IMembersListReqBody = {
      offset: page * 12,
      limit: 12,
    }

    if (searchValue) {
      body.query = searchValue
    }

    try {
      const res = await MemberManagement.getMembersList(body)
      dispatch(setPaginationCount(res.count))
      dispatch(setMembers(res.members))
    } catch (error) {
      throw error
    }
    dispatch(setShowLoader(false))
  }

  useEffect(() => {
    ;(async () => {
      await getMembersList()
    })()
  }, [page])

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
          <div>
            <p>found {count} results</p>
          </div>

          <div className="search-input">
            <Input
              onChange={handleSearchInput}
              value={searchValue}
              placeholder="Member search"
            />
          </div>
          <div>
            <Button onClick={getMembersList}>search</Button>
          </div>
        </div>
      </div>
      <div className="members-container">
        {members?.map((item: IMember) => {
          return (
            <div
              className={classNames('item', {
                blocked_item: !item.blocked,
              })}
              key={item.id}
              onClick={() => handleMemberClick(item.id)}
            >
              <LockIcon />
              <div className="top">
                <div className="avatar">
                  {item.avatar ? (
                    <figure className="figure">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API}/avatar/${item.avatar}`}
                        alt="memberAvatar"
                      />
                    </figure>
                  ) : (
                    <figure className="figure">
                      {item.firstName?.slice(0, 1).toUpperCase()}
                      {item.lastName?.slice(0, 1).toUpperCase()}
                    </figure>
                  )}
                </div>

                <div className="name">
                  <h4>{item.firstName}</h4>
                  <h4>{item.lastName}</h4>
                  <p>{item.username}</p>
                </div>
              </div>
              <div className="bottom">
                <p> E-mail: {item.email} </p>
                <p> Phone: {item.phone}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="pagination">
        {count ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel={<PaginationIcon />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={Math.round(count / 12)}
            previousLabel={<PaginationIcon />}
            initialPage={page}
          />
        ) : (
          ''
        )}
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
