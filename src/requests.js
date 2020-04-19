import axios from "axios";
import { withResponseTimeMeasures } from "./helpers/requests";

const requests = axios.create({
  baseURL: "https://api.github.com",
});

export default withResponseTimeMeasures(requests);
