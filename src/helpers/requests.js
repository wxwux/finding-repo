export const addInterceptors = (axiosInstance, interceptors) => {
  let startTime;
  let endTime;

  axiosInstance.interceptors.request.use(
    (config) => {
      startTime = performance.now();
      return config;
    },
    (error) => {
      console.log("error request", error.response.status);
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
      if (typeof error.response === "undefined") {
        error.response = {};
        error.response.status = 523;
        error.response.data = "You've reached requests limits of Github API";
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
