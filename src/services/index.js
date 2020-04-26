import $axios from "../requests";

const baseURL = "https://api.github.com";

const token = localStorage.getItem("token");
if (token) $axios.defaults.headers["Authorization"] = `token ${token}`;

export const fetchReposByQuery = async (query) => {
  return await $axios.get(`${baseURL}/search/repositories${query}`);
};

export const fetchRepoByOwnerAndTitle = async (owner, title) => {
  return await $axios.get(`${baseURL}/repos/${owner}/${title}`);
};

export const fetchDetailsByOwnerAndTitle = async (
  owner,
  title,
  detailsCategory
) => {
  const modifier = detailsCategory ? `/${detailsCategory}` : "";
  return await $axios.get(`${baseURL}/repos/${owner}/${title}${modifier}`);
};
