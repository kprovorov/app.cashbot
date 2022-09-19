import Payment from "./Payment";

export default interface CreatePaymentData
  extends Omit<
    Payment,
    "id" | "jar" | "balance" | "jar_savings_balance" | "original_amount"
  > {
  repeat: string;
  direction: "expense" | "income";
}
