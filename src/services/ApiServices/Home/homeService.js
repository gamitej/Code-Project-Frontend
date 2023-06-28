import http from "../../httpServices/httpServices";
import config from "../../config.js";

const endpoint = config.baseUrl;

console.log(endpoint, config);
export async function getAllTopics(id) {
  const { data } = await http.get(`${endpoint}/topics?id=${id}`);
  return data;
}
