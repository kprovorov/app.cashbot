import { Moment } from "moment";
import { Currency } from "./Enums";
import { AccountRaw, PaymentRaw, UserRaw } from "./ModelsRaw";

export type Account = Omit<AccountRaw, "payments_to" | "payments_from"> & {
  parent?: Account;
  payments?: Payment[];
  jars?: Account[];
  name: string;
  currency: Currency;
  balance: number;
  balance_converted: number;
  balance_savings: number;
};

export type Payment = PaymentRaw & {
  account_from?: Account;
  account_to?: Account;
  date: Moment;
  amount_converted: number;
  amount_original: number;
  applied_at?: Moment;
  balance: number;
  group_repeat_ends_on: Moment | null;
};

export type User = UserRaw;
