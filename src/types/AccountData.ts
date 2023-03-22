import { AccountRaw } from "./ModelsRaw";

export type AccountData = Partial<
  Omit<
    AccountRaw,
    | "id"
    | "user_id"
    | "user"
    | "parent"
    | "payments_to"
    | "payments_from"
    | "jars"
  >
>;

export type CreateAccountData = Partial<AccountData>;
export type UpdateAccountData = Partial<AccountData>;
