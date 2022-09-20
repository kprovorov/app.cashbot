import Payment from "./Payment";
import Jar from "./Jar";

export default interface Account {
  id: number;
  name: string;
  currency: string;
  balance: number;
  payments: Payment[];
  jars: Jar[];
  uah_balance?: number;
}
