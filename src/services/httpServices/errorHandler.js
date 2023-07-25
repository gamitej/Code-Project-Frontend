import { toast } from "react-hot-toast";

export function ErrorHandlerApi(error) {
  const status = error?.response?.status;
  if (status === undefined) {
    return { message: "Timeout !!!", error: true };
  }
  // to many req
  if (status === 429) {
    const text = error.response.statusText;
    toast.error("Too many requests", { duration: 2500 });
    return { message: text, error: true };
  }
  // unauthenticated
  if (status === 401) {
    const data = error.response.data.msg;
    const text = error.response.statusText;
    toast.error(`${text} - Token expired`, { duration: 2500 });
    // window.sessionStorage.removeItem("userInfo");
    // window.location.reload();
    return { message: "Token expired please login again", error: true };
  }
  // unprocessed entity
  if (status === 422) {
    const text = error.response.statusText;
    toast.error(text, { duration: 2500 });
    return { message: text, error: true };
  }
  const data = error.response.data.message;
  return { message: data, error: true };
}
