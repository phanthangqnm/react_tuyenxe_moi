import httpRequest from '../../services/http';

const URL_API = '/kho/api/kho_api/';
const URL_API_UPLOAD = '/kho/api/upload_api/';

export const get_data_tables_query = async (data : any) => {
  const response = await httpRequest.post(URL_API + 'get_data_tables_query', data);
  return response.data;
};

// export const hopdonginfoGet = async () => {
//   const response = await httpRequest.get(URL_API + 'hopdonginfo');
//   return response.data;
// };

// export const savehopdong = async (data: any) => {
//   const response = await httpRequest.post(URL_API + 'savehopdong', data);
//   return response.data;
// };

export const uploadFile = (data:any) => {
  return httpRequest.post(URL_API_UPLOAD + "upload_file", (data), {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

