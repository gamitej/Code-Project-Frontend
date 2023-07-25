import config from "../../config.js";
import http from "../../httpServices/httpServices";
import { ErrorHandlerApi } from "../../httpServices/errorHandler";

const endpoint = config.baseUrl;

export async function getNotification({ id, token }) {
  try {
    const { data } = await http.get(`${endpoint}/notifications?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return data;
  }
}

export async function notificationMarked({ id, token, req }) {
  try {
    const { data } = await http.post(
      `${endpoint}/mark-notifications?id=${id}`,
      req,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return data;
  }
}
