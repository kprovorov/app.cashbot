import Payment from "./Payment";

export default interface CreatePaymentData
  extends Omit<
    Payment,
    "id" | "jar" | "balance" | "jar_savings_balance" | "amount_converted"
  > {
  repeat: string;
  direction: "expense" | "income";
}
