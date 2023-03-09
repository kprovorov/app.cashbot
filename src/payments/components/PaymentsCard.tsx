import React, { PropsWithChildren } from "react";
import PaymentListItem from "./PaymentListItem";
import Card from "../../common/components/ui/card/Card";
import CardHeader from "../../common/components/ui/card/CardHeader";
import CardTitle from "../../common/components/ui/card/CardTitle";
import { Payment } from "../../types/Models";

export default function PaymentsCard({
  title,
  payments,
  onDeleted,
  onUpdated,
  showHiddenPayments = false,
}: PropsWithChildren<{
  title: string;
  payments: Payment[];
  onDeleted: () => void;
  onUpdated: () => void;
  showHiddenPayments?: boolean;
}>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <div>
        {payments
          .filter((payment) => showHiddenPayments || !payment.hidden)
          .map((payment, index) => (
            <PaymentListItem
              key={`${payment.id}_${index}`}
              payment={payment}
              currency={payment.currency}
              onDeleted={onDeleted}
              onUpdated={onUpdated}
            />
          ))}
      </div>
    </Card>
  );
}
