import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expecedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expecedError) {
    logger.log("Error log: ", error);
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
