import Payment from "../interfaces/Payment";

export function isTransfer(payment: Payment): boolean {
  // If one of those fields is not null, it's a transfer
  return !!(payment.from_transfer || payment.to_transfer);
}

export function isOutgoingPaymentWithinSameAccountTransfer(
  payment: Payment
): boolean {
  return (
    isTransfer(payment) && // If payment is a transfer
    !!payment.to_transfer && // If this payment is outgoing from current account
    payment.to_transfer.payment_to?.jar?.account_id === payment.jar?.account_id // If both payments within the same account
  );
}

export function isIncomingPaymentWithinSameAccountTransfer(
  payment: Payment
): boolean {
  return (
    isTransfer(payment) && // If payment is a transfer
    !!payment.from_transfer && // If this payment is incoming to current account
    payment.from_transfer.payment_from?.jar?.account_id ===
      payment.jar?.account_id // If both payments within the same account
  );
}
