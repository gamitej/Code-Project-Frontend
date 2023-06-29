import http from "../../httpServices/httpServices";
import config from "../../config.js";

const endpoint = config.baseUrl;

export async function getSelectedTopicData(id, topic) {
  try {
    const { data } = await http.get(
      `${endpoint}/selected_topic?id=${id}&topic=${topic}`
    );
    return data;
  } catch (error) {
    const data = error.response.data.message;
    return { data: data, error: true };
  }
}
