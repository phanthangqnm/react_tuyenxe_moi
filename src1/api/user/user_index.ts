import httpRequest from '../../services/http';

const URL_API = '/user/api/user_api/';


export const loaduser = async () => {
  console.log('aaaaaaaaaaaaa')
  const response = await httpRequest.get(URL_API + 'loaduser');
  console.log('bbbbbbbbbbbbbbbbbbbb')
  console.log(response)
  return response.data;
};


