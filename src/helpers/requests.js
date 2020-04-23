export const measureTime = () => {
  let startTime;
  let endTime;

  return {
    startMeasurement() {
      startTime = performance.now();
    },
    endMeasurement() {
      endTime = performance.now();
      return endTime - startTime;
    },
  };
};

export const addUnknownErrorStatus = (errorConfig) => {
  if (typeof errorConfig.response !== "undefined") return errorConfig;
  errorConfig.response = {};
  errorConfig.response.status = 523;
  errorConfig.response.data = "Github API limits error";
  return errorConfig;
};