import { basePath, apiVersion } from "./config";
import axios from "axios";
export function getModulesHomeByCourseApi(courseID) {
  const url = `${basePath}/${apiVersion}/get-modules-home/${courseID}`;
  return axios.get(`${url}`);
}
export function getModulesByCourseApi(courseID, token) {
  const url = `${basePath}/${apiVersion}/get-modules/${courseID}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  return axios.get(url, config);
}
export function getCoursesPublishedApi() {
  const url = `${basePath}/${apiVersion}/get-published-courses`;
  return axios.get(`${url}`);
}

export function deleteModuleApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-module/${id}`;

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  return axios.delete(url, config);
}

export function addModuleApi(token, module) {
  const url = `${basePath}/${apiVersion}/add-module`;
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  JSON.stringify(module);
  return axios.post(url, module, config);
}

export function updateModuleApi(token, id, module) {
  const url = `${basePath}/${apiVersion}/update-module/${id}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  JSON.stringify(module);
  return axios.put(url, module, config);
}
