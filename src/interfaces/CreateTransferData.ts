export default interface CreateTransferData {
  description?: string;
  date: string;
  amount: number;
  rate: number;
  account_from_id: number;
  account_to_id: number;
  repeat: string;
  currency: string;
  hidden: boolean;
  auto_apply: boolean;
}
