export interface UserData {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  accessToken: string;
  login: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles: number[];
}

export type UserAuthData = {
  login: string;
  email?: string;
  password: string;
};
