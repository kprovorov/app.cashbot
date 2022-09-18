import React, { PropsWithChildren } from "react";
import Account from "../../interfaces/Account";
import PaymentListItem from "./PaymentListItem";
import { isOutgoingPaymentWithinSameAccountTransfer } from "../../helpers/PaymentHelper";

export default function PaymentsList({
  account,
  accounts,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  account: Account;
  accounts: Account[];
  onDeleted: () => void;
  onUpdated: () => void;
}>) {
  return (
    <div className="payment-list">
      {account.payments
        .filter(
          (payment) => !isOutgoingPaymentWithinSameAccountTransfer(payment)
        )
        .map((payment) => (
          <PaymentListItem
            key={payment.id}
            payment={payment}
            accounts={accounts}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
          />
        ))}
    </div>
  );
}
