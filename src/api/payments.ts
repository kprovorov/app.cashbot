import api from "../services/api";
import Payment from "../interfaces/Payment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UpdatePaymentGeneralData } from "../interfaces/UpdatePaymentGeneralData";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "../hooks/common";
import { DASHBOARD_QUERY } from "./dashboard";
import CreatePaymentData from "../interfaces/CreatePaymentData";
import CreateTransferData from "../interfaces/CreateTransferData";

export const PAYMENTS_QUERY = "PAYMENTS_QUERY";

export function usePayments(group?: string) {
  return useQuery<Payment[], AxiosError<BackendErrorResponse>>(
    PAYMENTS_QUERY,
    async () =>
      (
        await api.get("payments", {
          params: {
            group,
          },
        })
      ).data
  );
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation<
    Payment,
    AxiosError<BackendErrorResponse>,
    CreatePaymentData
  >(
    async (data: CreatePaymentData): Promise<Payment> => {
      return (await api.post<Payment>("payments", data)).data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PAYMENTS_QUERY);
        queryClient.invalidateQueries(DASHBOARD_QUERY);
      },
    }
  );
}

export function useCreateTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<BackendErrorResponse>,
    CreateTransferData
  >(
    async (data: CreateTransferData): Promise<void> => {
      return (await api.post<void>("transfers", data)).data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(PAYMENTS_QUERY);
        queryClient.invalidateQueries(DASHBOARD_QUERY);
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
        queryClient.invalidateQueries(DASHBOARD_QUERY);
      },
    }
  );
}
