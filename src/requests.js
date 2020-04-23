import axios from "axios";
import { measureTime, addUnknownErrorStatus } from "./helpers/requests";
const measurer = measureTime();

const requests = axios.create({
  baseURL: "https://api.github.com",
});

requests.interceptors.request.use(
  (config) => {
    measurer.startMeasurement();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requests.interceptors.response.use(
  (response) => {
    response.responseTime = measurer.endMeasurement();
    return response;
  },
  (error) => {
    const errorConfig = addUnknownErrorStatus(error);
    return Promise.reject(errorConfig);
  }
);

export default requests;
