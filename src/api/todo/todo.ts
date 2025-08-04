import httpRequest from '../../services/http';

interface LoginPayload {
  username: string;
  password: string;
}

export const list = async () => {
  const response = await httpRequest.get('/todo/api/todo_api/list');
  return response.data;
};