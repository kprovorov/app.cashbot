import Payment from "./Payment";

export default interface CreatePaymentData
  extends Omit<Payment, "id" | "jar" | "balance" | "currency"> {
  repeat: string;
}
