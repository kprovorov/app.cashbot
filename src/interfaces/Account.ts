import Payment from "./Payment";

export default interface Account {
  id: number;
  name: string;
  currency: string;
  balance: number;
  payments: Payment[];
  uah_balance?: number;
  parent_id?: number;
  parent?: Account;
  jars?: Account[];
}
