import api from "./axiosCustom";

export const login = async (phoneNumber) => {
  const res = await api.post(`/auth/login`, {
    phoneNumber,
  });
  return res.data;
};

export const register = async (registerObj) => {
  const res = await api.post(`/auth/register`, registerObj);
  return res.data;
};
