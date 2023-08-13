import axios from "axios";

const apiLocal = "http://localhost:8081/";
const apiURL = "https://api-administrador-financeiro.vercel.app/";

export default axios.create({
    baseURL: apiLocal,
    withCredentials: true
});