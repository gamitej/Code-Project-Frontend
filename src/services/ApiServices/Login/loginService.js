import http from "../../httpServices/httpServices";
import config from "../../config.js";

const endpoint = config.baseUrl;

export async function postLogin(req) {
  try {
    const { data } = await http.post(`${endpoint}/login`, req);
    return data;
  } catch (error) {
    const data = error.response.data.message;
    return { message: data, error: true };
  }
}

export async function postSignup(req) {
  try {
    const { data } = await http.post(`${endpoint}/signup`, req);
    return data;
  } catch (error) {
    const data = error.response.data.message;
    return { message: data, error: true };
  }
}
