import { RequestAPI } from '../api/auth/axios-wraper'

function getAdminAccountInfo(res: any) {
  return RequestAPI.post('api/admin/member-management/get-account-info', res)
}

export const AdminManager = {
  getAdminAccountInfo,
}
