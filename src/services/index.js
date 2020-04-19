import $axios from "../requests";

export const fetchReposByQuery = async (query) => {
  return await $axios.get(`/search/repositories${query}`);
};

export const fetchRepoByOwnerAndTitle = async (owner, title) => {
  return await $axios.get(`/repos/${owner}/${title}`);
};

export const fetchDetailsByOwnerAndTitle = async (
  owner,
  title,
  detailsCategory
) => {
  const modifier = detailsCategory ? `/${detailsCategory}` : "";
  return await $axios.get(`/repos/${owner}/${title}${modifier}`);
};
