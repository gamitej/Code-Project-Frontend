import config from "../../config.js";
import http from "../../httpServices/httpServices";
import { ErrorHandlerApi } from "../../httpServices/errorHandler";

const endpoint = config.baseUrl;

export async function getAllTopics({ id, token }) {
  try {
    const { data } = await http.get(`${endpoint}/topics?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    console.log(data);
    return { data: data };
  }
}

// api for calling server in 5min interval
export async function checkServer() {
  try {
    const { data } = await http.get(`${endpoint}/checkServer`);
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return { data: data };
  }
}
