import CreatePaymentData from "./CreatePaymentData";

export default interface UpdatePaymentData
  extends Omit<CreatePaymentData, "jar_id" | "repeat"> {}
