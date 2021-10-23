import {API, Routes} from '~/constants';
import getUrl from '../utils/getUrl';

const logout = async () => {
  try {
    await fetch(getUrl(API.Logout), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });

    localStorage.removeItem('token');
    window.location.href = Routes.Login;
  }
  catch (error) {
    // error
  }
};

export default logout;
