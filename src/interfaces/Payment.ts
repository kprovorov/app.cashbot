import Jar from "./Jar";

export default interface Payment {
  id: number;
  description: string;
  amount: number;
  currency: string;
  date: string;
  balance: number;
  default_jar?: boolean;
  jar_balance?: number;
  jar_savings_balance?: number;
  repeat?: string;
  jar_id: number;
  jar: Jar;
}
