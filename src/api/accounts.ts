import Account from "../interfaces/Account";
import api from "../services/api";
import CreateTransferData from "../interfaces/CreateTransferData";
import Rate from "../interfaces/Rate";
import CreatePaymentData from "../interfaces/CreatePaymentData";
import UpdatePaymentData from "../interfaces/UpdatePaymentData";

export async function getAccounts(): Promise<Account[]> {
  const { data } = await api.get("accounts");

  return data;
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

export async function deleteGroup(groupId: number): Promise<void> {
  await api.delete(`groups/${groupId}`);
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
