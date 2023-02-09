import axios from "axios";
const baseURL = "api/auth";

const register = async credentials => {
    const response = await axios.post(`${baseURL}/register`, credentials);
    return response.data;
};

const login = async credentials => {
    const response = await axios.post(`${baseURL}/login`, credentials);
    return response.data;
};

const loginCheck = async () => {
    const response = await axios.get(`${baseURL}/login`);
    return response.data;
};

export default { register, login, loginCheck };
