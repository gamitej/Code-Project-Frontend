import { toast } from "react-hot-toast";

export function ErrorHandlerApi(error) {
  const status = error.response.status;
  if (status === 429) {
    toast.error("Too many requests", { duration: 2500 });
  }
  const data = error.response.data.message;
  return { message: data, error: true };
}
