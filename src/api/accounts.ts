import Account from "../interfaces/Account";
import api from "../services/api";
import CreateTransferData from "../interfaces/CreateTransferData";
import Rate from "../interfaces/Rate";
import CreatePaymentData from "../interfaces/CreatePaymentData";
import UpdatePaymentData from "../interfaces/UpdatePaymentData";
import UpdateAccountData from "../interfaces/UpdateAccountData";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useAccounts() {
  return useQuery<Account[]>(
    "accounts",
    async () => (await api.get("accounts")).data
  );
}

export function useUpdateAccount(accountId: number) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: UpdateAccountData) =>
      await api.put(`accounts/${accountId}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dashboard");
        queryClient.invalidateQueries("accounts");
      },
    }
  );
}

export async function createPayment(
  paymentData: CreatePaymentData
): Promise<void> {
  await api.post("payments", {
    ...paymentData,
    amount: paymentData.amount * 10000,
  });
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

export async function createTransfer(data: CreateTransferData): Promise<void> {
  await api.post("transfers", {
    ...data,
    amount: data.amount * 10000,
    rate: data.rate * 10000,
  });
}

export async function deletePayment(paymentId: number): Promise<void> {
  await api.delete(`payments/${paymentId}`);
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
