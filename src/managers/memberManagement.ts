import { RequestAPI } from '../api/auth/axios-wraper'

function getMembersList(data: any) {
  return RequestAPI.post('api/admin/member-management/list', data)
}
function getMemberData(_id: any) {
  return RequestAPI.post('api/admin/member-management/get-account-info', _id)
}
export const MemberManagement = {
  getMembersList,
  getMemberData,
}
