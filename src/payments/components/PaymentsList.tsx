import moment from "moment";
import { PropsWithChildren } from "react";
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
    <div>
      {account.payments
        .filter((payment) => showHidden || !payment.hidden)
        .map((payment) => ({ ...payment, date: moment(payment.date).unix() }))
        .map((payment) => {
          if (payment.repeat_unit === "none") {
            return [payment];
          }

          const res = [];

          let date = payment.date;

          const dateTill = payment.repeat_ends_on
            ? moment(payment.repeat_ends_on).unix()
            : moment().add(1, "year").unix();

          while (date < dateTill) {
            res.push({
              ...payment,
              date,
            });

            date = moment
              .unix(date)
              .add(payment.repeat_interval, payment.repeat_unit)
              .unix();
          }

          return res;
        })
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
