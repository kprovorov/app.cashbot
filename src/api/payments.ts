import api from "../services/api";
import { useMutation, useQueryClient } from "react-query";
import { UpdatePaymentGeneralData } from "../interfaces/UpdatePaymentGeneralData";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "../hooks/common";
import CreatePaymentData from "../interfaces/CreatePaymentData";
import { PaymentRaw } from "../types/ModelsRaw";

export const PAYMENTS_QUERY = "PAYMENTS_QUERY";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation<
    PaymentRaw,
    AxiosError<BackendErrorResponse>,
    CreatePaymentData
  >(
    async (data: CreatePaymentData): Promise<PaymentRaw> => {
      return (await api.post<PaymentRaw>("payments", data)).data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PAYMENTS_QUERY);
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
      return api.put(`/payments/${paymentId}/general`, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PAYMENTS_QUERY);
      },
    }
  );
}

export function useDeletePaymentMutation(paymentId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, { date: string }>(
    ({ date }: { date: string }) => {
      return api.delete(`/payments/${paymentId}`, { params: { date } });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PAYMENTS_QUERY);
      },
    }
  );
}
