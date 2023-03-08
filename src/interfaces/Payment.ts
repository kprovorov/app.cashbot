import Account from "./Account";
import Transfer from "./Transfer";

export default interface Payment {
  from_transfer?: Transfer;
  to_transfer?: Transfer;
  id: number;
  description: string;
  amount: number;
  amount_converted: number;
  currency: string;
  date: string;
  balance: number;
  account_id: number;
  account: Account;
  group: string;
  hidden: boolean;
  ends_on?: string;
  auto_apply: boolean;
  repeat_unit: "none" | "year" | "quarter" | "month" | "week" | "day";
  repeat_interval: number;
  repeat_ends_on?: string;
}
