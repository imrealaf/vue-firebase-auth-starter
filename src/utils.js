export const getMenuData = () => {
  const data = sessionStorage.getItem('my_app_menu');
  if (data) {
    return JSON.parse(data);
  }
};

export const getUserData = () => {
  const data = sessionStorage.getItem('my_app');
  if (data) {
    return JSON.parse(data).user;
  }
};

export const setMenuData = (data) => {
  if (data) {
    const merged = {
      ...getMenuData(),
      ...data
    };
    sessionStorage.setItem('my_app_menu', JSON.stringify(merged));
  }
};
