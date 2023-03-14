import { PaymentRaw } from "../types/ModelsRaw";

export default interface CreatePaymentData
  extends Omit<
    PaymentRaw,
    | "id"
    | "account_to"
    | "account_from"
    | "amount_to_converted"
    | "amount_from_converted"
    | "group"
    | "applied_at"
    | "balance"
  > {}
