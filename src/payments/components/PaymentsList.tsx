import { PropsWithChildren } from "react";
import { Account } from "../../types/Models";
import PaymentListItem from "./PaymentListItem";

export default function PaymentsList({
  account,
}: PropsWithChildren<{
  account: Account;
}>) {
  return (
    <div className="overflow-y-auto flex flex-col">
      {account.payments?.map((payment) => (
        <PaymentListItem
          account={account}
          key={`${payment.id}_${payment.date.unix()}`}
          payment={payment}
          currency={account.currency}
          showGroupOnClick={true}
        />
      ))}
    </div>
  );
}
