import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { BackendErrorResponse } from "../hooks/common";
import LoginFormData from "../interfaces/LoginFormData";
import api from "../services/api";
import { PasswordResetData, PasswordRestoreData } from "../types/AuthData";
import { User } from "../types/Models";
import { ACCOUNTS_QUERY } from "./accounts";

export const CURRENT_USER_QUERY = "CURRENT_USER_QUERY";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, LoginFormData>(
    async (data: LoginFormData) => {
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

  return useMutation<void, AxiosError<BackendErrorResponse>, {}>(
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

export function usePasswordRestoreMutation() {
  return useMutation<
    void,
    AxiosError<BackendErrorResponse>,
    PasswordRestoreData
  >(
    async (data: PasswordRestoreData) => {
      await api.get("sanctum/csrf-cookie");
      await api.post("forgot-password", data);
    },
    {
      onSuccess: () => {
        alert("Password restore link sent to your email");
      },
      onError: (error) => {
        alert(error.response?.data.message);
      },
    }
  );
}

export function usePasswordResetMutation() {
  const navigate = useNavigate();

  return useMutation<void, AxiosError<BackendErrorResponse>, PasswordResetData>(
    async (data: PasswordResetData) => {
      await api.get("sanctum/csrf-cookie");
      await api.post("reset-password", data);
    },
    {
      onSuccess: (data) => {
        alert("Password reset successfully");
        navigate("/auth/login");
      },
      onError: (error) => {
        alert(error.response?.data.message);
      },
    }
  );
}

export function useCurrentUserQuery() {
  return useQuery<User, AxiosError<BackendErrorResponse>>(
    CURRENT_USER_QUERY,
    async () => {
      const res = await api.get("user");

      return res.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
}
