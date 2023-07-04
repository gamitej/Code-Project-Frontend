import config from "../../config.js";
import http from "../../httpServices/httpServices";
import { ErrorHandlerApi } from "../../httpServices/errorHandler";

const endpoint = config.baseUrl;

export async function getAllTopics(id) {
  try {
    const { data } = await http.get(`${endpoint}/topics?id=${id}`);
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return data;
  }
}
