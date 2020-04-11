import { basePath, apiVersion } from "./config";
import axios from "axios";
export function getTutorialApi() {
  const url = `${basePath}/${apiVersion}/get-tutorials`;
  return axios.get(`${url}`);
}

export function getTutorialPublishedApi() {
  const url = `${basePath}/${apiVersion}/get-published-tutorials`;
  return axios.get(`${url}`);
}

export function getTutorialByIdApi(id) {
  const url = `${basePath}/${apiVersion}/get-tutorial/${id}`;
  return axios.get(`${url}`);
}

export function deleteTutorialApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-tutorial/${id}`;

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return axios.delete(url, config);
}

export function addTutorialApi(token, tutorial) {
  const url = `${basePath}/${apiVersion}/add-tutorial`;
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  JSON.stringify(tutorial);
  return axios.post(url, tutorial, config);
}

export function updateTutorialAvatarApi(token, data) {
  const url = `${basePath}/${apiVersion}/update-tutorial-avatar/${data.tutorial._id}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  JSON.stringify(data);
  return axios.put(url, data, config);
}

export function updateTutorialApi(token, id, tutorial) {
  const url = `${basePath}/${apiVersion}/update-tutorial/${id}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  JSON.stringify(tutorial);
  return axios.put(url, tutorial, config);
}
