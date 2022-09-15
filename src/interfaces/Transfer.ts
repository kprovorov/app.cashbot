import Payment from "./Payment";

export default interface Transfer {
  id: number;
  payment_to: Payment;
  payment_from: Payment;
}
