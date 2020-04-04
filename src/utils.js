import { STORAGE_KEY_NAME } from './constants';

export const getMenuData = () => {
  const data = sessionStorage.getItem('my_app_menu');
  if (data) {
    return JSON.parse(data);
  }
};

export const getUserData = () => {
  const data = sessionStorage.getItem(STORAGE_KEY_NAME);
  if (data) {
    return JSON.parse(data).user;
  }
};
