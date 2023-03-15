import { PaymentUpdateMode } from "../types/Enums";
import UpdatePaymentData from "./UpdatePaymentData";

export type UpdatePaymentGeneralData = Omit<
  UpdatePaymentData,
  | "date"
  | "auto_apply"
  | "dynamic"
  | "repeat_unit"
  | "repeat_interval"
  | "repeat_ends_on"
> & {
  from_date: string;
  mode?: PaymentUpdateMode;
};
