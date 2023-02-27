import moment, { DurationInputArg2 } from "moment";
import React, { PropsWithChildren } from "react";
import Account from "../../interfaces/Account";
import { currencyFormat } from "../../services/formatters";
import PaymentListItem from "./PaymentListItem";

export const getRepeatNumber = (repeat: string) => {
  if (repeat === "day") {
    return 365;
  } else if (repeat === "week") {
    return 52;
  } else if (repeat === "month") {
    return 12;
  } else if (repeat === "quarter") {
    return 4;
  } else if (repeat === "year") {
    return 1;
  } else {
    return 1;
  }
};

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
    <div>
      {account.payments
        .filter((payment) => showHidden || !payment.hidden)
        .map((payment) => ({ ...payment, date: moment(payment.date).unix() }))
        .map((payment) =>
          payment.repeat_unit === "none"
            ? [payment]
            : [...Array(getRepeatNumber(payment.repeat_unit)).keys()].map(
                (r) => ({
                  ...payment,
                  date:
                    payment.repeat_unit !== "none"
                      ? moment
                          .unix(payment.date)
                          .add(r, payment.repeat_unit)
                          .unix()
                      : payment.date,
                })
              )
        )
        .flat()
        .sort((a, b) => a.date - b.date)
        .map((payment, index, array) => ({
          ...payment,
          balance: array
            .slice(0, index + 1)
            .reduce(
              (acc, payment) => acc + payment.amount_converted,
              account.balance
            ),
        }))
        .map((payment) => ({
          ...payment,
          date: moment.unix(payment.date).toISOString(),
        }))
        .map((payment) => (
          <PaymentListItem
            key={`${payment.id}_${moment(payment.date).unix()}`}
            payment={payment}
            currency={account.currency}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
          />
        ))}
    </div>
  );
}
