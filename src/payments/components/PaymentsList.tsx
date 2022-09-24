import React, { PropsWithChildren } from "react";
import Account from "../../interfaces/Account";
import PaymentListItem from "./PaymentListItem";
import { isOutgoingPaymentWithinSameAccountTransfer } from "../../helpers/PaymentHelper";

export default function PaymentsList({
  account,
  onDeleted,
  onUpdated,
  showHidden = false,
}: PropsWithChildren<{
  account: Account;
  onDeleted: () => void;
  onUpdated: () => void;
  showHidden?: boolean;
}>) {
  return (
    <div className="payment-list">
      {account.payments
        .filter(
          (payment) => !isOutgoingPaymentWithinSameAccountTransfer(payment)
        )
        .filter((payment) => showHidden || !payment.hidden)
        .map((payment) => (
          <PaymentListItem
            key={payment.id}
            payment={payment}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
          />
        ))}
    </div>
  );
}
