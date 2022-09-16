import CreatePaymentData from "./CreatePaymentData";

export default interface UpdatePaymentData
  extends Omit<CreatePaymentData, "repeat" | "direction"> {}
