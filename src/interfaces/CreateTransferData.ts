export default interface CreateTransferData {
  date: string;
  amount: number;
  rate: number;
  account_from_id: number;
  account_to_id: number;
}
