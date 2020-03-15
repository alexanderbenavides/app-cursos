let basePath = "";
const apiVersion = "v1";

const environment = process.env.NODE_ENV;
if (environment === "development") {
  basePath = "http://localhost:3977/api";
}
export { basePath, apiVersion };
