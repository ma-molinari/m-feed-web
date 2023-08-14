import toaster from "cogo-toast";

import { APIError } from "@entities/response";

const defaultErrorHandler = (error: APIError) => {
  if (error.response?.data?.message) {
    toaster.error(error.response.data.message);
    return;
  }

  toaster.error(error?.message);
};

export default defaultErrorHandler;
