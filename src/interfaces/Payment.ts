import Jar from "./Jar";

export default interface Payment {
  id: number;
  description: string;
  amount: number;
  currency: string;
  date: string;
  balance?: number;
  jar_balance?: number;
  repeat?: string;
  jar_id: number;
  jar?: Jar;
}
