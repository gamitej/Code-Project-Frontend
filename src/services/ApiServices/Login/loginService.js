import config from "../../config.js";
import http from "../../httpServices/httpServices";
import { ErrorHandlerApi } from "../../httpServices/errorHandler";

const endpoint = config.baseUrl;

export async function postLogin(req) {
  try {
    const { data } = await http.post(`${endpoint}/login`, req);
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return data;
  }
}

export async function postSignup(req) {
  try {
    const { data } = await http.post(`${endpoint}/signup`, req);
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return data;
  }
}
