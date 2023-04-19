import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BackendErrorResponse } from "../hooks/common";
import api from "../services/api";
import { CURRENT_USER_QUERY } from "./auth";
import { UserProfileData } from "../types/UserProfileData";
import { UserPasswordData } from "../types/UserPasswordData";

export function useUpdateUserProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, UserProfileData>(
    async (data: UserProfileData) => {
      await api.put("user/profile-information", data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY] });
      },
    }
  );
}

export function useUpdateUserPasswordMutation() {
  return useMutation<void, AxiosError<BackendErrorResponse>, UserPasswordData>(
    async (data: UserPasswordData) => {
      await api.put("user/password", data);
    }
  );
}
