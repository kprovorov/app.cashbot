import Payment from "./Payment";

export default interface CreatePaymentData
  extends Omit<
    Payment,
    "id" | "account" | "balance" | "amount_converted" | "group"
  > {}
