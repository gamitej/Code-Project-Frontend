import http from "../../httpServices/httpServices";
import config from "../../config.js";

const endpoint = config.baseUrl;

// POST QUESTIONS
export async function postQuestion(req) {
  try {
    const { data } = await http.post(`${endpoint}/add-questions`, req);
    return data;
  } catch (error) {
    console.log(error, error.message);
  }
}

// GET DROPDOWN DATA
export async function getProfileDropdowns() {
  try {
    const { data } = await http.get(`${endpoint}/profile/dropdown-data`);
    return data;
  } catch (error) {
    const data = error.response.data.message;
    return { data: data, error: true };
  }
}

// GET TABLE DATA
export async function getTableData(id) {
  try {
    const { data } = await http.get(`${endpoint}/profile/table_data?id=${id}`);
    return data;
  } catch (error) {
    const data = error.response.data.message;
    return { data: data, error: true };
  }
}
