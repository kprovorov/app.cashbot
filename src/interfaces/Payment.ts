import Jar from "./Jar";
import Transfer from "./Transfer";
import Group from "./Group";

export default interface Payment {
  from_transfer?: Transfer;
  to_transfer?: Transfer;
  id: number;
  description: string;
  amount: number;
  amount_converted: number;
  currency: string;
  date: string;
  balance: number;
  default_jar?: boolean;
  jar_balance?: number;
  jar_savings_balance?: number;
  jar_id: number;
  jar: Jar;
  group_id?: number;
  group?: Group;
  hidden: boolean;
  ends_on?: string;
}
