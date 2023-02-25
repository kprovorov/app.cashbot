import api from "../services/api";
import Payment from "../interfaces/Payment";

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
