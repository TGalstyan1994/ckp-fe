import { RequestAPI } from '../api/auth/axios-wraper'

function getMembersList(data: any) {
  return RequestAPI.post('api/admin/member-management/list', data)
}
function getMemberData(_id: { userId: number }) {
  return RequestAPI.post('api/admin/member-management/get-account-info', _id)
}
function getMemberSocialData(_id: { userId: number }) {
  return RequestAPI.post('api/admin/member-management/get-social', _id)
}
function updatePassword(data: any) {
  return RequestAPI.post('api/admin/member-management/update-password', data)
}
function updateSecurityPin(data: any) {
  return RequestAPI.post(
    'api/admin/member-management/update-security-pin',
    data
  )
}
function updateMemberSocialData(data: any) {
  return RequestAPI.post('api/admin/member-management/update-social', data)
}
export const MemberManagement = {
  getMembersList,
  getMemberData,
  getMemberSocialData,
  updatePassword,
  updateSecurityPin,
  updateMemberSocialData,
}
