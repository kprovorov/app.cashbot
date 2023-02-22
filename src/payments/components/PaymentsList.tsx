import React, { PropsWithChildren } from "react";
import Account from "../../interfaces/Account";
import PaymentListItem from "./PaymentListItem";

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
    <div className="tw-divide-y">
      {account.payments
        .filter((payment) => showHidden || !payment.hidden)
        .map((payment) => (
          <PaymentListItem
            key={payment.id}
            payment={payment}
            currency={account.currency}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
          />
        ))}
    </div>
  );
}
