import React, { PropsWithChildren, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { currencyFormat } from "./services/formatters";
import { getAccountPayments } from "./api/accounts";
import Payment from "./interfaces/Payment";
import Account from "./interfaces/Account";
import PaymentsTable from "./payments/components/PaymentsTable";

export default function AccountCard({
  account,
}: PropsWithChildren<{ account: Account }>) {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    (async () => await fetchPayments())();
  });

  const fetchPayments = async () => {
    const res = await getAccountPayments(account.id);

    setPayments(res);
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>
          {account.name} - {currencyFormat(account.balance, account.currency)}
        </Card.Title>
        <PaymentsTable
          account={account}
          payments={payments}
          onPaymentDeleted={fetchPayments}
        />
      </Card.Body>
    </Card>
  );
}
