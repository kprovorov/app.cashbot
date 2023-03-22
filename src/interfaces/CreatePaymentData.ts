import { PaymentRaw } from "../types/ModelsRaw";

export default interface CreatePaymentData
  extends Omit<
    PaymentRaw,
    "id" | "account_to" | "account_from" | "group" | "applied_at" | "balance"
  > {}
