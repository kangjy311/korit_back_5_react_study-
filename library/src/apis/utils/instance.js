import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
        // "Bearer " <- 띄어쓰기 해야 함
    }
});

export default instance;