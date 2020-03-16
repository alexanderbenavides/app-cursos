import { basePath, apiVersion } from "./config";
import axios from "axios";
export function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;
  return axios.get(`${url}`);
}

export function getCoursesPublishedApi() {
  const url = `${basePath}/${apiVersion}/get-published-courses`;
  return axios.get(`${url}`);
}

export function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  return axios.delete(url, config);
}

export function addCourseApi(token, course) {
  const url = `${basePath}/${apiVersion}/add-course`;
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  JSON.stringify(course);
  return axios.post(url, course, config);
}

export function updateCourseApi(token, id, course) {
  const url = `${basePath}/${apiVersion}/update-course/${id}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  JSON.stringify(course);
  return axios.put(url, course, config);
}
