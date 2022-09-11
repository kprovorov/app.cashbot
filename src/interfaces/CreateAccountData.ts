import Account from "./Account";

export default interface CreateAccountData
  extends Omit<Account, "id" | "payments" | "jars"> {}
