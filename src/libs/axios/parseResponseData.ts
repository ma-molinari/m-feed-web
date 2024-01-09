import { AxiosResponse } from "axios";

import { RawResponse } from "@entities/response";

export default function parseResponseData<T extends object & { ct?: number }>(
  response: AxiosResponse<RawResponse<T>> | AxiosResponse<T>
): T {
  if ("ct" in response.data) {
    return response.data as T;
  }

  if (typeof response.data === `object` && `data` in response.data) {
    return response.data.data;
  }

  return response.data;
}
