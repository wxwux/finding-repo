import $axios from "../requests";
export const corsProxy = "https://cors-anywhere.herokuapp.com";

const baseURL = `${corsProxy}/https://github.com`;

export const authorizeLink = "https://github.com/login/oauth/authorize";
export const clientId = "9e2a2d966d712540e176";
export const clientSecret = "b531a55d73be434beee6b3bd34d22e4664796d78";

export const authLink = `${authorizeLink}?client_id=${clientId}&scope=repo%20user`;

export const getAccessToken = async (code) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
  };

  return await $axios.post(`${baseURL}/login/oauth/access_token`, body);
};


