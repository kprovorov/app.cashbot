import Account from "../interfaces/Account";
import api from "../services/api";
import Payment from "../interfaces/Payment";
import CreateTransferData from "../interfaces/CreateTransferData";

export async function getAccounts(): Promise<Account[]> {
  const { data } = await api.get("accounts");

  return data;
}

export async function getAccountPayments(
  accountId: number
): Promise<Payment[]> {
  const { data } = await api.get(`accounts/${accountId}/payments`);

  return data;
}

export async function createPayment(
  accountId: number,
  paymentData: Omit<Payment, "id">
): Promise<Payment> {
  const { data } = await api.post(
    `accounts/${accountId}/payments`,
    paymentData
  );

  return data;
}

export async function createTransfer(data: CreateTransferData): Promise<void> {
  await api.post("transfers", data);
}

export async function deletePayment(paymentId: number): Promise<void> {
  await api.delete(`payments/${paymentId}`);
}
