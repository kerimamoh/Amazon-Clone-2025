import axios  from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseUrRL: "https://amazon-api-deploy-14bd.onrender.com/",
});



export { axiosInstance };