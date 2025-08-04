import httpRequest from '../../services/http';

const URL_API = '/todo2/api/todo_api2/';


export const list = async () => {
  const response = await httpRequest.get(URL_API + 'list');
  //console.log(response.data)
  return response.data;
};

export const process_action = async (data: any) => {
  const response = await httpRequest.post(URL_API + 'process_action', data);
  console.log(data + '-----' + response.data)
  return response.data;
};

export const delete_data = async (id: any) => {
  const response = await httpRequest.delete(URL_API + 'delete_data/' + id);
  return response.data;
};


