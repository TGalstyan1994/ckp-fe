export interface INewPasswordStore {
  errors: {
    newPass: string
    repeatPass: string
  }
  fetching: boolean
  fetchingErrors: string
  data: {
    new: string
    repeat: string
  }
}
