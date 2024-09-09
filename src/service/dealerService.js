import { axiosInstance } from "../common/axios";

export const getDealers = ({ page, limit }) => {
  let url = `users/dealers?`;

  if (page && limit) {
    url += `page=${page}&limit=${limit}`;
  }

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const createDealer = (data) => {
  const url = `/users/dealers`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const updateDealer = (id, data) => {
  const url = `/users/${id}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const deleteDealer = (id) => {
  const url = `/users/${id}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
