import $axios from "../requests";

export const fetchReposByQuery = async (query) => {
  const result = await $axios.get(`/search/repositories${query}`);
  return result;
};

export const fetchRepoByOwnerAndTitle = async (owner, title) => {
  const result = await $axios.get(`/repos/${owner}/${title}`);
  return result;
};

export const fetchDetailsByOwnerAndTitle = async (
  owner,
  title,
  detailsCategory
) => {
  const modifier = detailsCategory ? `/${detailsCategory}` : "";
  const result = await $axios.get(`/repos/${owner}/${title}${modifier}`);
  return result;
};
