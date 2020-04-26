import $axios from "../requests";

const baseURL = `https://api.github.com`;

const token = localStorage.getItem("token");

if (token) {
  $axios.defaults.headers["Authorization"] = `token ${token}`;
}

export const getUser = async () => {
  return await $axios.get(`${baseURL}/user`);
};
