import axios from "axios";

const requests = axios.create({
  baseURL: "https://api.github.com",
});

export default requests;
