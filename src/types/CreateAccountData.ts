import { AccountRaw } from "../types/ModelsRaw";

export type CreateAccountData = Omit<
  AccountRaw,
  | "id"
  | "user_id"
  | "user"
  | "parent"
  | "payments_to"
  | "payments_from"
  | "jars"
>;
