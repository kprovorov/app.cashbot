import React, { PropsWithChildren, useContext } from "react";
import AccountBalance from "./AccountBalance";
import { currencyFormat } from "../../services/formatters";
import AccountsContext from "../../context/AccountsContext";
import Card from "../../common/components/ui/card/Card";
import CardHeader from "../../common/components/ui/card/CardHeader";
import CardTitle from "../../common/components/ui/card/CardTitle";

export default function AccountBalances({
  onUpdated,
}: PropsWithChildren<{ onUpdated: () => void }>) {
  const { accounts } = useContext(AccountsContext);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balances</CardTitle>
        <div className="tw-font-bold">
          {currencyFormat(
            accounts.reduce(
              (partialSum, account) => partialSum + (account.uah_balance || 0),
              0
            ),
            "UAH"
          )}
        </div>
      </CardHeader>
      <div>
        {accounts.map((account) => (
          <div key={account.id} className="tw-grid tw-grid-cols-4 tw-py-2">
            <div className="tw-col-span-2 tw-truncate tw-font-semibold">
              {account.name}
            </div>

            <div className="tw-text-end tw-text-slate-400">
              <AccountBalance account={account} onUpdated={onUpdated} />
            </div>
            {account.uah_balance !== undefined && (
              <div className="tw-text-end">
                {currencyFormat(account.uah_balance, "UAH")}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
