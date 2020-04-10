import axios from "axios";
export function getContributions() {
  const GITHUB_USERNAME = "alexanderbenavides";

  //   const url = `https://api.github.com`;
  const url = `https://api.github.com/users/${GITHUB_USERNAME}`;

  return axios.get(`${url}`);
}
