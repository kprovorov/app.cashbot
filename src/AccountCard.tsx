import React, { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";
import { currencyFormat } from "./services/formatters";
import Account from "./interfaces/Account";
import PaymentsTable from "./payments/components/PaymentsTable";

export default function AccountCard({
  account,
  onPaymentDeleted,
}: PropsWithChildren<{ account: Account; onPaymentDeleted: () => void }>) {
  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>
          {account.name} - {currencyFormat(account.balance, account.currency)}
        </Card.Title>
        <PaymentsTable account={account} onPaymentDeleted={onPaymentDeleted} />
      </Card.Body>
    </Card>
  );
}
