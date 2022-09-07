import React, { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";
import { currencyFormat } from "./services/formatters";
import Account from "./interfaces/Account";
import PaymentsTable from "./payments/components/PaymentsTable";

export default function AccountCard({
  account,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  account: Account;
  onDeleted: () => void;
  onUpdated: () => void;
}>) {
  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>
          {account.name} - {currencyFormat(account.balance, account.currency)}
        </Card.Title>
        <PaymentsTable
          account={account}
          onDeleted={onDeleted}
          onUpdated={onUpdated}
        />
      </Card.Body>
    </Card>
  );
}
