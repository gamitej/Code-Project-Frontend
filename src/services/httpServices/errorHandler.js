import { toast } from "react-hot-toast";

export function ErrorHandlerApi(error) {
  const status = error.response.status;
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
    toast.error(text, { duration: 2500 });
    return { message: data, error: true };
  }
  const data = error.response.data.message;
  return { message: data, error: true };
}
