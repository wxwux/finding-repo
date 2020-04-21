import axios from "axios";
import { addInterceptors } from "./helpers/requests";

const requests = axios.create({
  baseURL: "https://api.github.com",
});

export default addInterceptors(requests);