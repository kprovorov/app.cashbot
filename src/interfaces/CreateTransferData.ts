export default interface CreateTransferData {
  description?: string;
  date: string;
  amount: number;
  rate: number;
  jar_from_id: number;
  jar_to_id: number;
  repeat: string;
  currency: string;
}
