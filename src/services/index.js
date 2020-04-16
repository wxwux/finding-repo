import $axios from "../requests";

export const fetchReposByQuery = async (query) => {
  const result = await $axios.get(`/search/repositories${query}`);
  return result;
};
