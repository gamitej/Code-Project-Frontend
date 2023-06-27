import http from "../../httpServices/httpServices";
import config from "../../config.json";

const endpoint = config.apiEndpoint;

export async function getSelectedTopicData(id, topic) {
  const { data } = await http.get(
    `${endpoint}/selected_topic?id=${id}&topic=${topic}`
  );
  return data;
}
