import { measureTime } from "../requests";

const request = (requestTime) =>
  new Promise((resolve, reject) => {
    const measurer = measureTime();
    measurer.startMeasurement();
    setTimeout(() => {
      resolve(measurer.endMeasurement());
    }, requestTime);
  });

const measuresIsInCorrectRange = (value) => {
  const calculationErrorMcs = 10;
  const bottomEdge = value - calculationErrorMcs;
  const topEdge = value + calculationErrorMcs;
  return value >= bottomEdge && value <= topEdge;
};

it("measures time", () => {
  const requestTimeMs = 500;
  return request(requestTimeMs).then((time) => {
    expect(measuresIsInCorrectRange(time)).toBe(true);
  });
});
