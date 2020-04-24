import { runSaga } from "redux-saga";
import { reposList } from "../reposSaga";
import { queryConstructor } from "../../../helpers/queries";
import * as service from "../../../services";

const responseObj = {
  data: {
    items: [1, 2, 3],
    total_count: 3,
  },
  responseTime: 1000,
  headers: {
    link: `<https://api.github.com/search/repositories?q=react&page=2>; rel="next", <https://api.github.com/search/repositories?q=react&page=34>; rel="last"`,
  },
};

describe("loads the repos and store then in case of success", () => {
  let dispatched, store, payload;
  beforeEach(async () => {
    dispatched = [];
    store = {
      getState: () => ({}),
      dispatch: (action) => dispatched.push(action),
    };

    service.fetchReposByQuery = jest.fn(() => Promise.resolve(responseObj));

    const query = queryConstructor.byTitle("react");
    await runSaga(store, reposList, query).done;

    payload = dispatched[0].payload;
  });

  it("contains the right data", async () => {
    expect(service.fetchReposByQuery.mock.calls.length).toBe(1);
    expect(payload.data).toStrictEqual([1, 2, 3]);
    expect(payload.total).toBe(3);
    expect(payload.responseTime).toBe(1000);
  });

  it("contains proper pagination object", () => {
    expect(payload.pagination).toMatchObject({
      next: "https://api.github.com/search/repositories?q=react&page=2",
      total: 34,
      active: 1,
    });
  });
});

it("puts unknown error object", async () => {
  const errorObj = {
    response: {
      status: 520,
    },
  };

  const result = {
    status: 520,
    message: "Unknown error",
  };

  const dispatched = [];
  const store = {
    getState: () => ({}),
    dispatch: (action) => dispatched.push(action),
  };

  service.fetchReposByQuery = jest.fn(() => Promise.reject(errorObj));

  const query = queryConstructor.byTitle("react");
  await runSaga(store, reposList, query).done;

  const { payload } = dispatched[0];

  expect(payload).toMatchObject(result);
});
