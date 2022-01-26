import { RequestAPI } from '../api/auth/axios-wraper'

function membersList(data: any) {
  return RequestAPI.post('api/admin/member-management/list', data)
}

export const MemberManagement = {
  membersList,
}
