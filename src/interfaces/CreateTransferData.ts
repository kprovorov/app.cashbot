export default interface CreateTransferData {
  description?: string;
  date: string;
  amount: number;
  rate: number;
  account_from_id: number;
  account_to_id: number;
  repeat_unit: "none" | "year" | "quarter" | "month" | "week" | "day";
  repeat_interval?: number;
  repeat_ends_on?: string;
  currency: string;
  hidden: boolean;
  auto_apply: boolean;
}
