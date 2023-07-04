import config from "../../config.js";
import http from "../../httpServices/httpServices";
import { ErrorHandlerApi } from "../../httpServices/errorHandler";

const endpoint = config.baseUrl;

export async function getSelectedTopicData({ id, topic, token }) {
  try {
    const { data } = await http.get(
      `${endpoint}/selected_topic?id=${id}&topic=${topic}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return { data: data };
  }
}

export async function markQuestion({ id, question_id, token }) {
  // console.log(id, question_id, token);
  try {
    const apiData = { user_id: id, question_id: question_id.que_id };
    console.log(apiData);
    const { data } = await http.post(`${endpoint}/markQuestion`, apiData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return { data: data };
  }
}
