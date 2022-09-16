import React, { PropsWithChildren } from "react";
import { Card, Table } from "react-bootstrap";
import Account from "../../interfaces/Account";
import { currencyFormat } from "../../services/formatters";

export default function AccountBalances({
  accounts,
}: PropsWithChildren<{ accounts: Account[] }>) {
  return (
    <Card className="mt-4">
      <div className="p-3 fw-bold">Balances</div>

      {accounts.map((account) => (
        <div
          key={account.id}
          className="d-flex justify-content-between py-2 px-3 border-top"
        >
          <div>{account.name}</div>
          <div>{currencyFormat(account.balance, account.currency)}</div>
        </div>
      ))}
    </Card>
  );
}
