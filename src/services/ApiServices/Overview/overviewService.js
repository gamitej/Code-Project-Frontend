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

export async function markQuestion(user_id, question_id) {
  try {
    const apiData = { user_id: user_id, question_id: question_id };
    const { data } = await http.post(`${endpoint}/markQuestion`, apiData);
    return data;
  } catch (error) {
    const data = error.response.data.message;
    return { data: data, error: true };
  }
}
