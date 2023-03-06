import api from "../services/api";
import Payment from "../interfaces/Payment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import UpdatePaymentData from "../interfaces/UpdatePaymentData";
import { UpdatePaymentGeneralData } from "../interfaces/UpdatePaymentGeneralData";
import { AxiosError } from "axios";

export async function getPayment(paymentId: number): Promise<Payment> {
  const { data } = await api.get(`payments/${paymentId}`);

  return data;
}

export async function getPaymentsByGroup(group: string): Promise<Payment[]> {
  const { data } = await api.get("payments", {
    params: {
      group,
    },
  });

  return data;
}

export function usePayments(group?: string) {
  return useQuery<Payment[]>(
    "payments",
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

type ErrorBag = {
  [key: string]: string[];
};

type BackendErrorResponse = {
  message: string;
  errors: ErrorBag;
};

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
        queryClient.invalidateQueries("payments");
        queryClient.invalidateQueries("dashboard");
      },
    }
  );
}
