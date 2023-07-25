import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@global-libs/axios";
import parseResponseData from "@global-libs/axios/parseResponseData";
import { APIError, RawResponse } from "@entities/response";
import { User } from "@entities/user";

import { keyCurrentUser } from "./keys";

export const useCurrentUser = (
  options?: UseQueryOptions<User, APIError, User>
) => {
  return useQuery(
    keyCurrentUser(),
    () => api.get<RawResponse<User>>(`/users/me`).then(parseResponseData),
    options
  );
};
