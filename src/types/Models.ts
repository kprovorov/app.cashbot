import { Moment } from "moment";
import { Currency, RepeatUnit } from "./Enums";
import { AccountRaw } from "./ModelsRaw";

export type Account = Omit<AccountRaw, "payments_to" | "payments_from"> & {
  parent?: Account;
  payments?: Payment[];
  jars?: Account[];
  name: string;
  currency: Currency;
  balance: number;
  uah_balance?: number;
};

export type Payment = {
  id: number;
  account_from_id?: number;
  account_from?: Account;
  account_to_id?: number;
  account_to?: Account;
  description: string;
  amount_converted: number;
  amount_to_converted?: number;
  amount_from_converted?: number;
  amount: number;
  currency: Currency;
  date: Moment;
  hidden: boolean;
  ends_on?: Moment;
  group: string;
  auto_apply: boolean;
  applied_at?: Moment;
  repeat_unit: RepeatUnit;
  repeat_interval: number;
  repeat_ends_on?: Moment;
  balance: number;
};
