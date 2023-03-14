import { PropsWithChildren } from "react";
import { Account } from "../../types/Models";
import PaymentListItem from "./PaymentListItem";

export default function PaymentsList({
  account,
  showHidden = false,
}: PropsWithChildren<{
  account: Account;
  showHidden?: boolean;
}>) {
  return (
    <div>
      {account.payments
        ?.filter((payment) => showHidden || !payment.hidden)
        .map((payment) => (
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
