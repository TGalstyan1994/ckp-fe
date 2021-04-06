import axios from "../index";
import { UserData } from "interfaces/index";

export const authorizeUser = (
  login: string,
  password: string
): Promise<UserData> =>
  axios.post(`/api/auth/login`, { login, password }).then(({ data }) => data);

export const registerUser = (login: string, email: string, password: string) =>
  axios
    .post(`/api/users/register`, {
      login,
      email,
      password,
    })
    .then(({ data }) => data)
    .catch((res) => console.log(res.message));

export const createUser = (verificationCode: string): Promise<UserData> =>
  axios.post(`/api/users`, { verificationCode }).then(({ data }) => data);
