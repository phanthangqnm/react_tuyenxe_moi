import httpRequest from '../../services/http';

const URL_API = '/tuyenxe/api/tuyenxe_api/';

interface LoginPayload {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginPayload) => {
  const response = await httpRequest.post(URL_API + 'login', { username, password });
  console.log(response)
  return response.data;
};


export const gettuyenxe = async () => {
  const response = await httpRequest.get(URL_API + 'gettuyenxe');
  return response.data;
};

export const getgiochay = async () => {
  const response = await httpRequest.get(URL_API + 'getgiochay');
  return response.data;
};


export const getcustomerwithcodetx = async ({ tuyenxeinfo_code }: { tuyenxeinfo_code: string }) => {
  const response = await httpRequest.post(URL_API + 'getcustomerwithcodetx', { tuyenxeinfo_code });
  return response.data;
};

export const hopdonginfoPost = async (data : any) => {
  const response = await httpRequest.post(URL_API + 'hopdonginfo', data);
  return response.data;
};

export const hopdonginfoGet = async () => {
  const response = await httpRequest.get(URL_API + 'hopdonginfo');
  return response.data;
};

export const savehopdong = async (data: any) => {
  const response = await httpRequest.post(URL_API + 'savehopdong', data);
  return response.data;
};

