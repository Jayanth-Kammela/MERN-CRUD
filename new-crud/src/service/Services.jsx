import axios from "axios";

const url = "http://localhost:3000/todo";
const token = localStorage.getItem("token");

export const getallUsers = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUser = async (user) => {
  return await axios.post(url, user,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editUser = async (id, user) => {
  return await axios.put(`${url}/${id}`, user,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (id) => {
  return await axios.delete(`${url}/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
