import * as constants from '../constants';

export default {
  titleTemplate: `%s ${constants.TITLE_SEP} ${constants.APP_TITLE}`,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: constants.APP_DESC || ''
    }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
};
