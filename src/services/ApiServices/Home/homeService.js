import http from "../../httpServices/httpServices";
import config from "../../config.json";

const endpoint = config.apiEndpoint;

export async function getAllTopics(id) {
  const { data } = await http.get(`${endpoint}/topics?id=${id}`);
  return data;
}
