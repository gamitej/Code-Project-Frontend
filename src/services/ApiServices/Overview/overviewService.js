import config from "../../config.js";
import http from "../../httpServices/httpServices";
import { ErrorHandlerApi } from "../../httpServices/errorHandler";

const endpoint = config.baseUrl;

export async function getSelectedTopicData(id, topic) {
  try {
    const { data } = await http.get(
      `${endpoint}/selected_topic?id=${id}&topic=${topic}`
    );
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return data;
  }
}

export async function markQuestion(user_id, question_id) {
  try {
    const apiData = { user_id: user_id, question_id: question_id };
    const { data } = await http.post(`${endpoint}/markQuestion`, apiData);
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return data;
  }
}
