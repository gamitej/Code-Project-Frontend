import http from "../../httpServices/httpServices";
import config from "../../config.js";

const endpoint = config.baseUrl;

export async function getAllTopics(id) {
  try {
    const { data } = await http.get(`${endpoint}/topics?id=${id}`);
    return data;
  } catch (error) {
    const data = error.response.data.message;
    return { data: data, error: true };
  }
}
