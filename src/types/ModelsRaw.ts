import { Currency, RepeatUnit } from "./Enums";

export type AccountRaw = {
  id: number;
  user_id: number;
  user?: UserRaw;
  parent_id: number | null;
  parent?: AccountRaw;
  name: string;
  balance: number;
  currency: Currency;
  payments_to?: PaymentRaw[];
  payments_from?: PaymentRaw[];
  jars?: AccountRaw[];
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
  auto_apply: boolean;
  applied_at?: string;
  budget: boolean;
  repeat_unit: RepeatUnit;
  repeat_interval: number;
  repeat_ends_on?: string;
};

export type UserRaw = {
  id: number;
  name: string;
  email: string;
};
