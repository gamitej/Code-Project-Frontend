import config from "../../config.js";
import http from "../../httpServices/httpServices";
import { ErrorHandlerApi } from "../../httpServices/errorHandler";

const endpoint = config.baseUrl;

// POST QUESTIONS
export async function postQuestion({ token, req }) {
  try {
    const { data } = await http.post(
      `${endpoint}/add-questions`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      req
    );
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return { data };
  }
}

// GET DROPDOWN DATA
export async function getProfileDropdowns({ token }) {
  try {
    const { data } = await http.get(`${endpoint}/profile/dropdown-data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return { data };
  }
}

// GET TABLE DATA
export async function getTableData({ id, token }) {
  try {
    const { data } = await http.get(`${endpoint}/profile/table_data?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    const data = ErrorHandlerApi(error);
    return { data };
  }
}
