import Account from "../interfaces/Account";
import api from "../services/api";
import Payment from "../interfaces/Payment";
import CreateTransferData from "../interfaces/CreateTransferData";
import Rate from "../interfaces/Rate";
import CreatePaymentData from "../interfaces/CreatePaymentData";

export async function getAccounts(): Promise<Account[]> {
  const { data } = await api.get("accounts");

  return data;
}

export async function createPayment(
  jarId: number,
  paymentData: CreatePaymentData
): Promise<Payment> {
  const { data } = await api.post(`jars/${jarId}/payments`, paymentData);

  return data;
}

export async function createTransfer(data: CreateTransferData): Promise<void> {
  await api.post("transfers", data);
}

export async function deletePayment(paymentId: number): Promise<void> {
  await api.delete(`payments/${paymentId}`);
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
