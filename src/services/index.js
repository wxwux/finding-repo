import $axios from "../requests";

export const fetchReposByTitle = async (reposTitle) => {
  const {
    data: { items },
  } = await $axios.get(`/search/repositories?q=${reposTitle}`);

  return items;
};
