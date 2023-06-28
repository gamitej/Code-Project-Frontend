import http from "../../httpServices/httpServices";
import config from "../../config.js";

const endpoint = config.baseUrl;

export async function postQuestion(req) {
  try {
    const { data } = await http.post(`${endpoint}/add-questions`, req);
    return data;
  } catch (error) {
    console.log(error, error.message);
  }
}

export async function getProfileDropdowns() {
  try {
    const { data } = await http.get(`${endpoint}/profile/dropdown-data`);
    return data;
  } catch (error) {
    console.log(error, error.message);
  }
}
