import httpRequest from '../../services/http';

const URL_API = '/todo/api/todo_api/';


export const list = async () => {
  const response = await httpRequest.get(URL_API + 'list');
  return response.data;
};

export const process_action = async (data: any) => {
  const response = await httpRequest.post(URL_API + 'process_action', data);
  return response.data;
};

export const delete_data = async (id: any) => {
  const response = await httpRequest.delete(URL_API + 'delete_data/' + id);
  return response.data;
};


