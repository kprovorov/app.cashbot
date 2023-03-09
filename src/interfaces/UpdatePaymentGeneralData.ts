import UpdatePaymentData from "./UpdatePaymentData";

export type UpdatePaymentGeneralData = Omit<
  UpdatePaymentData,
  | "date"
  | "hidden"
  | "auto_apply"
  | "repeat_unit"
  | "repeat_interval"
  | "repeat_ends_on"
> & {
  from_date: string;
};
