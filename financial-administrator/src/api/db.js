import axios from "axios";

const apiLocal = "http://localhost:8081/";
const apiURL = "";

export default axios.create({
    baseURL: apiURL || apiLocal
});