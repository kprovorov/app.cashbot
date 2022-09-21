import React, { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";
import Account from "../../interfaces/Account";
import { isOutgoingPaymentWithinSameAccountTransfer } from "../../helpers/PaymentHelper";
import PaymentListItem from "./PaymentListItem";
import Payment from "../../interfaces/Payment";

export default function PaymentsCard({
  title,
  payments,
  accounts,
  onDeleted,
  onUpdated,
  showHiddenPayments = false,
}: PropsWithChildren<{
  title: string;
  payments: Payment[];
  accounts: Account[];
  onDeleted: () => void;
  onUpdated: () => void;
  showHiddenPayments?: boolean;
}>) {
  return (
    <Card className="mt-4 shadow">
      <div className="p-3 d-flex justify-content-between fw-bold border-bottom">
        <div className="text-uppercase">{title}</div>
      </div>
      <div className="payment-list">
        {payments
          .filter(
            (payment) => !isOutgoingPaymentWithinSameAccountTransfer(payment)
          )
          .filter((payment) => showHiddenPayments || !payment.hidden)
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
    </Card>
  );
}
