import React, { PropsWithChildren } from "react";
import { currencyFormat } from "../../services/formatters";
import DeletePaymentButton from "./DeletePaymentButton";
import Payment from "../../interfaces/Payment";
import DeleteGroupButton from "../../groups/components/DeleteGroupButton";

export default function PaymentsTableRow({
  payment,
  onDeleted,
}: PropsWithChildren<{
  payment: Payment;
  onDeleted: () => void;
}>) {
  return (
    <tr>
      <td>{payment.date}</td>
      <td>{payment.description}</td>
      <td>{payment.jar.name}</td>
      <td className={payment.amount > 0 ? "text-success" : "text-danger"}>
        {currencyFormat(payment.amount, payment.currency)}
      </td>
      <td
        className={
          payment.balance >= 0
            ? payment.jar_savings_balance &&
              payment.balance < payment.jar_savings_balance
              ? "text-bg-warning"
              : ""
            : "text-bg-danger"
        }
      >
        {currencyFormat(payment.balance, payment.currency)}
      </td>
      <td
        className={
          payment.jar.default ||
          (payment.jar_savings_balance && payment.jar_savings_balance >= 0)
            ? ""
            : "text-bg-danger"
        }
      >
        {payment.jar_savings_balance
          ? currencyFormat(payment.jar_savings_balance, payment.currency)
          : ""}
      </td>
      {payment.jar.account.jars
        .filter((jar) => !jar.default)
        .map((jar) => (
          <td
            key={jar.id}
            className={
              payment.jar_id !== jar.id ||
              (payment.jar_balance && payment.jar_balance >= 0)
                ? ""
                : "text-bg-danger"
            }
          >
            {payment.jar_balance && payment.jar_id === jar.id
              ? currencyFormat(payment.jar_balance, payment.currency)
              : ""}
          </td>
        ))}
      <td>
        <DeletePaymentButton paymentId={payment.id} onDeleted={onDeleted} />
        {payment.group_id ? (
          <DeleteGroupButton groupId={payment.group_id} onDeleted={onDeleted} />
        ) : null}
      </td>
    </tr>
  );
}
