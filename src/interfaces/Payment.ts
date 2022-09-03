export default interface Payment {
  id: number;
  account_id: number;
  description: string;
  amount: number;
  currency: string;
  date: string;
  balance: number;
  repeat?: string;
}
