import { basePath, apiVersion } from "./config";
import axios from "axios";
export function getProjectApi() {
  const url = `${basePath}/${apiVersion}/get-projects`;
  return axios.get(`${url}`);
}

export function getProjectPublishedApi() {
  const url = `${basePath}/${apiVersion}/get-published-projects`;
  return axios.get(`${url}`);
}

export function deleteProjectApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-project/${id}`;

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return axios.delete(url, config);
}

export function addProjectApi(token, project) {
  const url = `${basePath}/${apiVersion}/add-project`;
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  JSON.stringify(project);
  return axios.post(url, project, config);
}

export function updateProjectAvatarApi(token, data) {
  const url = `${basePath}/${apiVersion}/update-project-avatar/${data.project._id}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  JSON.stringify(data);
  return axios.put(url, data, config);
}

export function updateProjectApi(token, id, project) {
  const url = `${basePath}/${apiVersion}/update-project/${id}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  JSON.stringify(project);
  return axios.put(url, project, config);
}
