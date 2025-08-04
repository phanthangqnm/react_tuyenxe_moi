import httpRequest from '../../services/http';

interface LoginPayload {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginPayload) => {
  console.log("vào login.ts  .......");
  const response = await httpRequest.post('/user/api/user_api/login', { username, password });
  console.log(response)
  return response.data;
};
