import slugify from 'slugify';
import moment from 'moment';
import firebase from 'firebase';
import { STORAGE_KEY_NAME, DATE_FORMAT_SYSTEM } from './constants';

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

/**
 * defer
 * @description simply delays an action from happening
 * @param {Function} callback - the callback to execute
 * @param {String} delay - the number in milliseconds to delay callback
 */
export const defer = (callback, delay = 300) => {
  setTimeout(callback, delay);
};

export const transformData = (data) => {
  for (const key in data) {
    const value = data[key];

    if (
      value &&
      key.toLowerCase().includes('date') &&
      typeof value === 'string'
    ) {
      data[key] = firebase.firestore.Timestamp.fromDate(new Date(value));
    }

    if (value && value instanceof firebase.firestore.Timestamp) {
      data[key] = moment(value.toDate()).format(DATE_FORMAT_SYSTEM);
    }
  }

  return data;
};
