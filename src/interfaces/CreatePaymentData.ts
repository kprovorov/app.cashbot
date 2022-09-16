import Payment from "./Payment";

export default interface CreatePaymentData
  extends Omit<
    Payment,
    "id" | "jar" | "balance" | "currency" | "jar_savings_balance"
  > {
  repeat: string;
  direction: "expense" | "income";
}
