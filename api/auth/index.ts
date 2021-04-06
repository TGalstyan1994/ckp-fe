import axios from "axios";
import { UserData } from "interfaces/index";

export const authorizeUser = (
  login: string,
  password: string
): Promise<UserData> =>
  axios
    .post(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, { login, password })
    .then(({ data }) => data);

export const registerUser = (login: string, email: string, password: string) =>
  axios
    .post(`${process.env.NEXT_PUBLIC_API}/api/users/register`, {
      login,
      email,
      password,
    })
    .then(({ data }) => data)
    .catch((res) => console.log(res.message));

export const createUser = (verificationCode: string): Promise<UserData> => 
  axios
    .post(`${process.env.NEXT_PUBLIC_API}/api/users`, { verificationCode })
    .then(({ data }) => data)
