import slugify from 'slugify';
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

export const goBack = () => {
  window.history.back();
};

export const generateSlug = (text) => {
  return slugify(text, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true // strip special characters except replacement, defaults to `false`
  });
};
