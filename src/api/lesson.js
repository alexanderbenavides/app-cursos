import { basePath, apiVersion } from "./config";
import axios from "axios";
export function getLessonsByModuleApi(moduleID, token) {
  const url = `${basePath}/${apiVersion}/get-lessons/${moduleID}`;
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

export function deleteLessonApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-lesson/${id}`;

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  return axios.delete(url, config);
}

export function addLessonApi(token, lesson) {
  const url = `${basePath}/${apiVersion}/add-lesson`;
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  JSON.stringify(lesson);
  return axios.post(url, lesson, config);
}

export function updateLessonApi(token, id, lesson) {
  const url = `${basePath}/${apiVersion}/update-lesson/${id}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  JSON.stringify(lesson);
  return axios.put(url, lesson, config);
}
