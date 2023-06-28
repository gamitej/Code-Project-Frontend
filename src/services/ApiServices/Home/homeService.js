import http from "../../httpServices/httpServices";
import config from "../../config.js";

const endpoint = config.baseUrl;

export async function getAllTopics(id) {
  const { data } = await http.get(`${endpoint}/topics?id=${id}`);
  return data;
}
