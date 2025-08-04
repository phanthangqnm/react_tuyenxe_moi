import httpRequest from '../../services/http';

interface LoginPayload {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginPayload) => {
  const response = await httpRequest.post('/users/api/users_api/login', { username, password });
  console.log(response)
  return response.data;
};
