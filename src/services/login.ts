import {API} from '~/constants';
import getUrl from '../utils/getUrl';

const login = async (username: string, password: string) => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  try {
    const response = await fetch(url);
    const data = await response.json();
    const {token} = data;

    localStorage.setItem('token', token);
  }
  catch(error) {
    throw {message: "User with provided username/password cannot be found"};
  }
};

export default login;
