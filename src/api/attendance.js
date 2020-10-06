import { basePath, apiVersion } from "./config";
import axios from "axios";
export function addAttendance(data) {
  const url = `${basePath}/${apiVersion}/add-attendance`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  JSON.stringify(data);
  return axios.post(url, data, config);
}
