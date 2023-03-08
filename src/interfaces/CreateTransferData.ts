import CreatePaymentData from "./CreatePaymentData";

export default interface CreateTransferData
  extends Omit<CreatePaymentData, "account_id" | "direction"> {
  account_from_id: number;
  account_to_id: number;
}
