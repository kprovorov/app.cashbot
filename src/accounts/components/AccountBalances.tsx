import React, { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";
import Account from "../../interfaces/Account";
import AccountBalance from "./AccountBalance";
import { currencyFormat } from "../../services/formatters";

export default function AccountBalances({
  accounts,
  onUpdated,
}: PropsWithChildren<{ accounts: Account[]; onUpdated: () => void }>) {
  return (
    <Card className="mt-4 shadow">
      <div className="p-3 d-flex justify-content-between fw-bold border-bottom">
        <div className="w-50 text-uppercase">Balances</div>
        <div className="w-50 d-flex justify-content-end">
          {currencyFormat(
            accounts.reduce(
              (partialSum, account) => partialSum + (account.uah_balance || 0),
              0
            ),
            "UAH"
          )}
        </div>
      </div>
      {accounts.map((account) => (
        <div key={account.id} className="py-2 px-3 border-top row g-0">
          <div className="col-4 p-0 fw-semibold">{account.name}</div>

          <div className="col-4 p-0 text-end">
            <AccountBalance account={account} onUpdated={onUpdated} />
          </div>
          {account.uah_balance !== undefined && (
            <div className="col-4 p-0 text-end">
              {currencyFormat(account.uah_balance, "UAH")}
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}
