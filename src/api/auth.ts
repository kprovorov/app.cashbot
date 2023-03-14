import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BackendErrorResponse } from "../hooks/common";
import LoginFormData from "../interfaces/LoginFormData";
import api from "../services/api";
import { User } from "../types/Models";
import { ACCOUNTS_QUERY } from "./accounts";

export const CURRENT_USER_QUERY = "CURRENT_USER_QUERY";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, LoginFormData>(
    async (data) => {
      await api.get("sanctum/csrf-cookie");
      await api.post("login", data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CURRENT_USER_QUERY);
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>>(
    async () => {
      await api.post("logout");
    },
    {
      onSuccess: () => {
        queryClient.clear();
      },
    }
  );
}

export function useCurrentUser() {
  return useQuery<User, AxiosError<BackendErrorResponse>>(
    CURRENT_USER_QUERY,
    async () => {
      const res = await api.get("api/user");

      return res.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
}
