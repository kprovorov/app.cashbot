export default interface CreateTransferData {
  date: string;
  amount: number;
  rate: number;
  jar_from_id: number;
  jar_to_id: number;
  repeat: string;
}
