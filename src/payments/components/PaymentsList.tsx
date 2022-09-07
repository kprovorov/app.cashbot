import React, { PropsWithChildren } from "react";
import Account from "../../interfaces/Account";
import PaymentListItem from "./PaymentListItem";

export default function PaymentsList({
  account,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  account: Account;
  onDeleted: () => void;
  onUpdated: () => void;
}>) {
  return (
    <>
      {account.payments.map((payment) => (
        <PaymentListItem
          key={payment.id}
          payment={payment}
          onDeleted={onDeleted}
          onUpdated={onUpdated}
        />
      ))}
    </>
  );
}
