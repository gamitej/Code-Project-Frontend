// login
import { postLogin, postSignup } from "./ApiServices/Login/loginService";
import {
  getNotification,
  notificationMarked,
} from "./ApiServices/Login/notificationService";
// home
import { getAllTopics, checkServer } from "./ApiServices/Home/homeService";
// overview
import {
  getSelectedTopicData,
  markQuestion,
} from "./ApiServices/Overview/overviewService";
// profile
import {
  postQuestion,
  getProfileDropdowns,
  getTableData,
  getUserStatusData,
} from "./ApiServices/Profile/profileService";

export {
  checkServer,
  postLogin,
  postSignup,
  postQuestion,
  getAllTopics,
  getSelectedTopicData,
  markQuestion,
  getProfileDropdowns,
  getTableData,
  getUserStatusData,
  getNotification,
  notificationMarked,
};
