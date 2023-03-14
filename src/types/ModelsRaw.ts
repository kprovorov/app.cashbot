import { Currency, RepeatUnit } from "./Enums";

export type AccountRaw = {
  id: number;
  user_id: number;
  parent_id?: number;
  parent?: AccountRaw;

  payments_to?: PaymentRaw[];
  payments_from?: PaymentRaw[];
  jars?: AccountRaw[];

  name: string;
  currency: Currency;
  balance: number;
  uah_balance?: number;
};

export type PaymentRaw = {
  id: number;
  account_from_id?: number;
  account_from?: AccountRaw;
  account_to_id?: number;
  account_to?: AccountRaw;
  description: string;
  amount_to_converted?: number;
  amount_from_converted?: number;
  amount: number;
  currency: Currency;
  date: string;
  hidden: boolean;
  ends_on?: string;
  group: string;
  auto_apply: boolean;
  applied_at?: string;
  repeat_unit: RepeatUnit;
  repeat_interval: number;
  repeat_ends_on?: string;
  balance: number;
};
