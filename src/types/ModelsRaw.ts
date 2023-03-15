import { Currency, RepeatUnit } from "./Enums";

export type AccountRaw = {
  id: number;
  user_id: number;
  user?: UserRaw;
  parent_id?: number;
  parent?: AccountRaw;
  name: string;
  balance: number;
  currency: Currency;
  payments_to?: PaymentRaw[];
  payments_from?: PaymentRaw[];
  jars?: AccountRaw[];
  uah_balance?: number;
};

export type PaymentRaw = {
  id: number;
  account_from_id?: number;
  account_from?: AccountRaw;
  account_to_id?: number;
  account_to?: AccountRaw;
  group: string;
  description: string;
  date: string;
  amount: number;
  currency: Currency;
  amount_from_converted?: number;
  amount_to_converted?: number;
  auto_apply: boolean;
  applied_at?: string;
  dynamic: boolean;
  repeat_unit: RepeatUnit;
  repeat_interval: number;
  repeat_ends_on?: string;
};

export type UserRaw = {
  id: number;
  name: string;
  email: string;
};
