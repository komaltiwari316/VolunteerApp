import axios from "axios";

const API = axios.create({
  baseURL: "https://volunteerapp-backend.onrender.com"
});

export default API;