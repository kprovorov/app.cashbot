import React, { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";
import Account from "../../interfaces/Account";
import AccountBalance from "./AccountBalance";

export default function AccountBalances({
  accounts,
  onUpdated,
}: PropsWithChildren<{ accounts: Account[]; onUpdated: () => void }>) {
  return (
    <Card className="mt-4">
      <div className="p-3 text-uppercase fw-bold">Balances</div>
      {accounts.map((account) => (
        <div
          key={account.id}
          className="d-flex justify-content-between py-2 px-3 border-top"
        >
          <div>{account.name}</div>
          <div>
            <AccountBalance account={account} onUpdated={onUpdated} />
          </div>
        </div>
      ))}
    </Card>
  );
}
