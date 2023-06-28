import http from "../../httpServices/httpServices";
import config from "../../config.js";
import { toast } from "react-toastify";

const endpoint = config.baseUrl;


export async function postLogin(req) {
  try {
    const { data } = await http.post(`${endpoint}/login`, req);
    return data;
  } catch (error) {
    console.log(error, error.message);
    // toast.error(error.message, { autoClose: 1000 });
  }
}

export async function postSignup(req) {
  try {
    const { data } = await http.post(`${endpoint}/signup`, req);
    return data;
  } catch (error) {
    console.log(error, error.message);
    // toast.error(error.message, { autoClose: 1000 });
  }
}
