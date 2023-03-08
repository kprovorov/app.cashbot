import Account from "../interfaces/Account";
import api from "../services/api";
import CreateTransferData from "../interfaces/CreateTransferData";
import Rate from "../interfaces/Rate";
import CreatePaymentData from "../interfaces/CreatePaymentData";
import UpdatePaymentData from "../interfaces/UpdatePaymentData";
import UpdateAccountData from "../interfaces/UpdateAccountData";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "../hooks/common";
import { DASHBOARD_QUERY } from "./dashboard";

export const ACCOUNTS_QUERY = "ACCOUNTS_QUERY";

export function useAccounts() {
  return useQuery<Account[], AxiosError<BackendErrorResponse>>(
    ACCOUNTS_QUERY,
    async () => (await api.get("accounts")).data,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
}

export function useUpdateAccount(accountId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, UpdateAccountData>(
    async (data: UpdateAccountData) =>
      await api.put(`accounts/${accountId}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(DASHBOARD_QUERY);
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}

export async function updatePayment(
  paymentId: number,
  paymentData: UpdatePaymentData
): Promise<void> {
  await api.put(`payments/${paymentId}`, {
    ...paymentData,
    amount: paymentData.amount * 10000,
  });
}

export async function deleteGroup(group: string): Promise<void> {
  await api.delete(`payments/groups/${group}`);
}

export async function getRate(from: string, to: string): Promise<Rate> {
  const { data } = await api.get("rates", {
    params: {
      from,
      to,
    },
  });

  return data;
}
