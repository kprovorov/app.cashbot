import { AccountRaw } from "../types/ModelsRaw";

export default interface CreateAccountData
  extends Omit<AccountRaw, "id" | "payments"> {}
