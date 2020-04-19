export const withResponseTimeMeasures = (axiosInstance) => {
  let startTime;
  let endTime;

  axiosInstance.interceptors.request.use(
    (config) => {
      startTime = performance.now();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      endTime = performance.now();

      const responseTime = endTime - startTime;

      response.responseTime = responseTime;

      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
