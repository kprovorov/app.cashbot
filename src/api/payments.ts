import api from "../services/api";
import { useMutation, useQueryClient } from "react-query";
import { UpdatePaymentGeneralData } from "../interfaces/UpdatePaymentGeneralData";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "../hooks/common";
import CreatePaymentData from "../interfaces/CreatePaymentData";
import { PaymentRaw } from "../types/ModelsRaw";
import { ACCOUNTS_QUERY } from "./accounts";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation<
    PaymentRaw,
    AxiosError<BackendErrorResponse>,
    CreatePaymentData
  >(
    async (data: CreatePaymentData): Promise<PaymentRaw> => {
      return (await api.post<PaymentRaw>("api/payments", data)).data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}

export function useUpdatePaymentGeneralData(paymentId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<BackendErrorResponse>,
    UpdatePaymentGeneralData
  >(
    (data: UpdatePaymentGeneralData) => {
      return api.put(`api/payments/${paymentId}/general`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}

export function useDeletePaymentMutation(paymentId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, { date: string }>(
    ({ date }: { date: string }) => {
      return api.delete(`api/payments/${paymentId}`, { params: { date } });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}

export function useDeletePaymentsGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, string>(
    (group: string) => api.delete(`api/payments/groups/${group}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}
