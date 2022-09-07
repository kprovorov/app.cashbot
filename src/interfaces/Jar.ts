import Payment from "./Payment";
import Account from "./Account";

export default interface Jar {
  id: number;
  created_at: string;
  updated_at: string;
  account_id: number;
  name: string;
  default: boolean;
  account: Account;
  payments: Payment[];
}
