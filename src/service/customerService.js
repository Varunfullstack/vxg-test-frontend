import { axiosInstance } from "../common/axios";

export const getCustomers = ({ page, limit }) => {
  let url = `users/customers?`;

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

export const createCustomer = (data) => {
  const url = `/users/customers`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const updateCustomer = (id, data) => {
  const url = `/users/${id}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const deleteCustomer = (id) => {
  const url = `/users/${id}`;
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
